const prompts = require('prompts')
const npmNameChecker = require('./utils/npm-name-checker')
const validate = require('validate-npm-package-name')
const colors = require('colors')

const validatePackageName = name => {
  const isValid = validate(name)

  if (!name.length) {
    return `Please Enter your package name`.red
  }

  if (!isValid.validForNewPackages) {
    return 'errors' in isValid ? isValid.errors[0] : isValid.warnings[0]
  }

  return true
}

module.exports = async () => {

  const packageName = await prompts([
    {
      type: 'text',
      name: 'name',
      message: 'What is your package Name?',
      validate: name => validatePackageName(name)
    },
    {
      type: 'confirm',
      name: 'check',
      message: 'Would you like to check NPM package name availability?',
      initial: true
    }
  ])

  if (Object.keys(packageName).length && packageName.check) {
    const isAvailable = await npmNameChecker(packageName.name)
    const response = await prompts({
      type: 'confirm',
      name: 'retry',
      message: 'Would you like to change NPM package name?',
      initial: true
    })

    return {
      data: packageName,
      done: !response.retry
    }
  }

  return {
    data: packageName,
    done: true
  }

}

