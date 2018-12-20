const process = require('process')
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

  await stepHandler(require('./package-name'))
  await stepHandler(require('./package-description'))
  await stepHandler(require('./package-author'))

  console.log(packageData)

}

module
  .exports()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
