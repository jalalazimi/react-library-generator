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

  await stepHandler(require('./prompts/name'))
  await stepHandler(require('./prompts/description'))
  await stepHandler(require('./prompts/author'))
  await stepHandler(require('./prompts/test'))
  await stepHandler(require('./prompts/pkg'))

  console.log(packageData)

  await require('./library-genrator')(packageData)
}

module
  .exports()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
