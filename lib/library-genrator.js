const path = require('path')
const makeDir = require('make-dir')
const copy = require('recursive-copy')
const execShPromise = require('exec-sh').promise
const ora = require('ora')
const fs = require('fs').promises

const getPath = (dest, args) => {
  return dest === 'source' ? path.join(__dirname, '..', ...args) : path.join(process.cwd(), ...args)
}

const mergeFiles = async (x, y) => {
  const X = await fs.readFile(x, 'utf8')
  const Y = typeof y === 'string' ? await fs.readFile(y, 'utf8') : JSON.stringify(y)
  return fs.writeFile(x, JSON.stringify(Object.assign({}, JSON.parse(X), JSON.parse(Y)), null, 2))
}

module.exports = async data => {
  const { name } = data
  await makeDir(getPath('lib', [ name ]))
  // TODO: check file is exist

  {
    const promise = copy(getPath('source', [ 'templates', 'library', 'default' ]), getPath('lib', [ name ]), { dot: true })
    ora.promise(promise, 'Creating library scaffold')
    await promise
  }

  {
    const promise = copy(getPath('source', [ 'templates', 'test', 'ava', 'tests' ]), getPath('lib', [ name, 'tests' ]))
    ora.promise(promise, 'Creating tests')
    await promise
  }
  {
    const promise = mergeFiles(getPath('lib', [ name, 'package.json' ]), getPath('source', [ 'templates', 'test', 'ava', 'package.json' ]))
    ora.promise(promise, 'Test Configuration')
    await promise
  }
  {
    const promise = mergeFiles(getPath('lib', [ name, '.babelrc' ]), getPath('source', [ 'templates', 'test', 'ava', '.babelrc' ]))
    ora.promise(promise, 'Babel Configuration')
    await promise
  }
  {
    const { name, description, author } = data
    const promise = mergeFiles(getPath('lib', [ name, 'package.json' ]), { name, description, author })
    ora.promise(promise, 'Package.json Configuration')
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
