const process = require('process')
const program = require('commander')
const pkg = require('../package')

const packageData = {}
const stepHandler = async fn => {
  const response = await fn()
  if (response === false) {
    await fn()
  } else {
    Object.assign(packageData, response)
  }
}

module.exports = async () => {
  program
    .version(pkg.version)
    .parse(process.argv)

  await stepHandler(require('./package-name'))
  await stepHandler(require('./package-description'))
  await stepHandler(require('./package-author'))
  await require('./library-genrator')(packageData)
  console.log(packageData)
}

module
  .exports()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
