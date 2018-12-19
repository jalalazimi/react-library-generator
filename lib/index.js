const process = require('process')
const packageName = require('./package-name')

const stateManager = state => {
  switch (state) {
    case 'package_name':
      packageName()
      break
  }
}

module.exports = async () => {

  stateManager('package_name')

}

module
  .exports()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
