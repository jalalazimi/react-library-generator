const path = require('path')
const makeDir = require('make-dir')
const copy = require('recursive-copy')
const execShPromise = require('exec-sh').promise
const copyJsonFileMerged = require('copy-json-file-merged')
const ora = require('ora')
const fs = require('fs').promises
var merge = require('deepmerge')

const copyTo = async (from, to, config) => {
  await copy(from, path.join(process.cwd(), to), config)
}

const mkdir = async p => {
  const dest = path.join(process.cwd(), p)
  await makeDir(dest)
}

const mergeFiles = async (x, y) => {
  const X = await fs.readFile(x, 'utf8')
  const Y = typeof y === 'string' ? await fs.readFile(y, 'utf8') : JSON.stringify(y)
  return fs.writeFile(x, JSON.stringify(Object.assign({}, JSON.parse(X), JSON.parse(Y)), null, 2))
}

module.exports = async data => {
  const { name } = data
  await mkdir(name)
  // TODO: check file is exist

  {
    const promise = copyTo(`${path.join(__dirname, '..', 'templates', 'library', 'default')}`, name, { dot: true })
    ora.promise(promise, 'Creating library scaffold')
    await promise
  }

  {
    const promise = copyTo(`${path.join(__dirname, '..', 'templates', 'test', 'ava', 'tests')}`, `${name}/tests`)
    ora.promise(promise, 'Creating tests')
    await promise
  }
  {
    const promise = mergeFiles(path.join(process.cwd(), name, 'package.json'), path.join(__dirname, '..', 'templates', 'test', 'ava', 'package.json'))
    ora.promise(promise, 'Test Configuration')
    await promise
  }
  {
    const promise = mergeFiles(path.join(process.cwd(), name, '.babelrc'), path.join(__dirname, '..', 'templates', 'test', 'ava', '.babelrc'))
    ora.promise(promise, 'Babel Configuration')
    await promise
  }
  {
    const { name, description, author } = data
    const promise = mergeFiles(path.join(process.cwd(), name, 'package.json'), { name, description, author })
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
