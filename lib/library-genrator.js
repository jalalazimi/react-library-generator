const path = require('path')
const execShPromise = require('exec-sh').promise
const ora = require('ora')
const fs = require('fs-extra')

const getPath = (dest, args) => {
  return dest === 'source' ? path.join(__dirname, '..', 'templates', ...args) : path.join(process.cwd(), ...args)
}

const mergeFiles = async (x, y) => {
  const X = await fs.readJson(x)
  const Y = typeof y === 'string' ? await fs.readJson(y) : y
  return fs.writeJson(x, Object.assign({}, X, Y))
}

module.exports = async data => {
  const { name, test, description, author } = data
  await fs.mkdirs(getPath('lib', [ name ]))
  // TODO: check file is exist

  {
    const promise = fs.copy(getPath('source', [ 'library', 'default' ]), getPath('lib', [ name ]))
    ora.promise(promise, 'Creating library scaffold')
    await promise
  }
  {
    const promise = mergeFiles(getPath('lib', [ name, 'package.json' ]), { name, description, author })
    ora.promise(promise, 'Update package Info')
    await promise
  }

  {
    const copyTestFiles = fs.copy(getPath('source', [ 'test', test, 'tests' ]), getPath('lib', [ name, 'tests' ]))
    const mergeTestDependencies = mergeFiles(getPath('lib', [ name, 'package.json' ]), getPath('source', [ 'test', test, 'package.json' ]))
    const mergeBabelConfigs = mergeFiles(getPath('lib', [ name, '.babelrc' ]), getPath('source', [ 'test', test, '.babelrc' ]))
    const promise = Promise.all([ copyTestFiles, mergeTestDependencies, mergeBabelConfigs ])
    ora.promise(promise, 'Configuration tests')
    await promise
  }

  // let out
  //
  // try {
  //   out = await execShPromise(`cd ${data.name} && yarn install `, true)
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
