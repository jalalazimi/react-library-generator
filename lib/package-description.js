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

  const { description } = await prompts([
    {
      type: 'text',
      name: 'description',
      message: 'What is your package description?',
      initial: 'React component'
    }
  ])

  return { description }
}

