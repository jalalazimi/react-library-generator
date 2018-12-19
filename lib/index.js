const process = require('process')
const packageName = require('./package-name')

const packageData = {}

const getPackageName = async () => {
  const response = await packageName()
  if (response === false) {
    await getPackageName()
  } else {
    Object.assign(packageData, response)
  }
}




module.exports = async () => {

  await getPackageName()


  console.log(packageData)

}

module
  .exports()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
