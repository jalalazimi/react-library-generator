const prompts = require('prompts')
const npmNameChecker = require('../utils/npm-name-checker')
const validate = require('validate-npm-package-name')
const colors = require('colors')
let canceled = false

const validatePackageName = name => {
  const isValid = validate(name)

  if (!name.length) {
    return `Please Enter your package name`.red
  }

  if (!isValid.validForNewPackages) {
    return 'errors' in isValid ? isValid.errors[ 0 ] : isValid.warnings[ 0 ]
  }

  return true
}

module.exports = async () => {
  const packageName = await prompts([
    {
      type: 'text',
      name: 'name',
      message: 'What is your package name?',
      validate: name => validatePackageName(name)
    },
    {
      type: 'confirm',
      name: 'check',
      message: 'Would you like to check NPM package name availability?',
      initial: false
    }
  ], {
    onCancel: prompt => {
      console.log('Try again later')
      canceled = true
      return false
    }
  })

  const { check = false, name } = packageName

  if (check) {
    const isAvailable = await npmNameChecker(packageName.name)

    if (!isAvailable) {
      const { retry } = await prompts({
        type: 'confirm',
        name: 'retry',
        message: 'Would you like to change NPM package name?',
        initial: true
      }, {
        onCancel: prompt => {
          console.log('Try again later')
          canceled = true
          return false
        }
      })

      return { retry, name }
    }
  }
  return { name, canceled }
}
