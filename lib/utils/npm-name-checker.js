const npmName = require('npm-name')
const ora = require('ora')
const colors = require('colors')
const terminalLink = require('terminal-link')

module.exports = async (name) => {

  const spinner = ora('Checking package name on NPM').start()

  const isAvailable = await npmName(name)

  if (isAvailable) {
    spinner.succeed(`${name.underline.green} ${'is available!'.green}`)

  } else {
    spinner.fail(`${terminalLink(name.underline.red, `https://www.npmjs.com/package/${name}`)} ${'is unavailable'.red}`)
  }

  return isAvailable

}
