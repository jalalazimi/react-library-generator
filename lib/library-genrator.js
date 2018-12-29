const path = require('path')
const execShPromise = require('exec-sh').promise
const ora = require('ora')
const fs = require('fs-extra')
const merge = require('deepmerge')

const getPath = (dest, args) => {
  return dest === 'source' ? path.join(__dirname, '..', 'templates', ...args) : path.join(process.cwd(), ...args)
}

const mergeFiles = async (x, y) => {
  const X = await fs.readJson(x)
  const Y = typeof y === 'string' ? await fs.readJson(y) : y
  return fs.writeJson(x, merge(X, Y), { replacer: null, spaces: 2 })
}

const configParser = async (config, projectName) => {
  const { copy, update } = require(path.join(config, 'config.js'))

  if (copy) {
    for (const item of copy) {
      if (item === '*') {
        await fs.copy(path.join(config), getPath('lib', [ projectName ]))
      } else {
        await fs.copy(path.join(config, item), getPath('lib', [ projectName, item ]))
      }
    }
  }

  if (update) {
    for (const item of update) {
      console.log('item', item)
      await mergeFiles(getPath('lib', [ projectName, item ]), path.join(config, item))
    }
  }
}

module.exports = async data => {
  const { name, test, description, author, pkg, docs } = data
  await fs.mkdirs(getPath('lib', [ name ]))
  // TODO: check file is exist

  {
    const promise = configParser(getPath('source', [ 'library', 'default' ]), name)
    ora.promise(promise, 'Creating library scaffold')
    await promise
  }

  {
    const promise = configParser(getPath('source', [ 'test', test ]), name)
    ora.promise(promise, 'Configuration tests')
    await promise
  }
  {
    const promise = configParser(getPath('source', [ 'documentation', docs ]), name)
    ora.promise(promise, 'Configuration documentation')
    await promise
  }

  {
    const promise = mergeFiles(getPath('lib', [ name, 'package.json' ]), { name, description, author })
    ora.promise(promise, 'Update package Info')
    await promise
  }

  // let out
  //
  // try {
  //   out = await execShPromise(`cd ${name} && ${pkg} install `, true)
  // } catch (e) {
  //   console.log('Error: ', e)
  //   console.log('Stderr: ', e.stderr)
  //   console.log('Stdout: ', e.stdout)
  //
  //   return e
  // }
  //
  // console.log('out: ', out.stdout, out.stderr)
}
