const prompts = require('prompts')
const npmNameChecker = require('./utils/npm-name-checker')
const validate = require('validate-npm-package-name')

module.exports = async () => {

  console.log(validate('some-package'))
  const packageName = await prompts([
    {
      type: 'text',
      name: 'name',
      message: 'What is your package Name?',
      validate: value => !value.length ? `Please Enter your package name` : true
    },
    {
      type: 'confirm',
      name: 'check',
      message: 'Would you like to check NPM package name availability?',
      initial: true
    }
  ])

  if (Object.keys(packageName).length && packageName.check) {
    await npmNameChecker(packageName.name)
  }

}

