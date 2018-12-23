const path = require('path')
const makeDir = require('make-dir')
const copy = require('recursive-copy')

module.exports = async data => {
  const dest = path.join(process.cwd(), data.name)
  await makeDir(dest)

  await copy(`${path.join(__dirname, '..', 'templates', 'library', 'default')}`, path.join(process.cwd(), data.name), {
    dot: true
  })
}
