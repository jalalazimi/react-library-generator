const path = require('path')
const makeDir = require('make-dir')
const copy = require('recursive-copy')
const execShPromise = require('exec-sh').promise

module.exports = async data => {
  const dest = path.join(process.cwd(), data.name)
  await makeDir(dest)
  // TODO: check file is exist
  await copy(`${path.join(__dirname, '..', 'templates', 'library', 'default')}`, path.join(process.cwd(), data.name), {
    dot: true
  })



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
