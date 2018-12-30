const path = require('path')
const execShPromise = require('exec-sh').promise
const ora = require('ora')
const fs = require('fs-extra')
const merge = require('deepmerge')

/**
 * Merge x and y and store the merged value in x
 * @param x
 * @param y
 * @returns {Promise<*>}
 */
const mergeFiles = async (x, y) => {
  const X = await fs.readJson(x)
  const Y = typeof y === 'string' ? await fs.readJson(y) : y
  return fs.writeJson(x, merge(X, Y), { replacer: null, spaces: 2 })
}

/** Path of predefined templates **/
const source = path.join(__dirname, '..', 'templates')
/** Path of generated library **/
const dest = path.join(process.cwd())

/**
 * Parse config file for each templates and run commands
 * @param templatePath
 * @param projectName
 * @returns {Promise<void>}
 */
const configParser = async (templatePath, projectName) => {
  const { copy, update } = require(path.join(templatePath, 'config.js'))

  if (copy) {
    for (const item of copy) {
      const _item = item === '*' ? '' : item
      await fs.copy(path.join(templatePath, _item), path.join(dest, projectName, _item))
    }
  }

  if (update) {
    for (const item of update) {
      await mergeFiles(path.join(dest, projectName, item), path.join(templatePath, item))
    }
  }
}

module.exports = async data => {
  const { name, test, description, author, pkg, docs } = data
  await fs.mkdirs(path.join(dest, name))
  // TODO: check file is exist

  {
    const promise = configParser(path.join(source, 'library', 'default'), name)
    ora.promise(promise, 'Creating library scaffold')
    await promise
  }

  {
    const promise = configParser(path.join(source, 'test', test), name)
    ora.promise(promise, 'Configuration tests')
    await promise
  }
  {
    const promise = configParser(path.join(source, 'documentation', docs), name)
    ora.promise(promise, 'Configuration documentation')
    await promise
  }

  {
    const promise = mergeFiles(path.join(dest, name, 'package.json'), { name, description, author })
    ora.promise(promise, 'Update package Info')
    await promise
  }

  let out

  try {
    out = await execShPromise(`cd ${name} && ${pkg} install `, true)
  } catch (e) {
    console.log('Error: ', e)
    console.log('Stderr: ', e.stderr)
    console.log('Stdout: ', e.stdout)

    return e
  }

  console.log('out: ', out.stdout, out.stderr)
}
