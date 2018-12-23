const path = require('path')
const makeDir = require('make-dir')
const copy = require('recursive-copy')
const execShPromise = require('exec-sh').promise
const editJsonFile = require('edit-json-file')

module.exports = async data => {
  const dest = path.join(process.cwd(), data.name)
  await makeDir(dest)
  // TODO: check file is exist
  await copy(`${path.join(__dirname, '..', 'templates', 'library', 'default')}`, path.join(process.cwd(), data.name), {
    dot: true
  })

  const PKG = await editJsonFile(path.join(process.cwd(), data.name, 'package.json'), { autosave: true })

  PKG.set('name', data.name)
  PKG.set('author', data.author)
  PKG.set('description', data.description)

  let out

  try {
    out = await execShPromise(`cd ${data.name} && yarn install `, true)
  } catch (e) {
    console.log('Error: ', e)
    console.log('Stderr: ', e.stderr)
    console.log('Stdout: ', e.stdout)

    return e
  }

  console.log('out: ', out.stdout, out.stderr)

}
