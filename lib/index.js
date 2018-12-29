const process = require('process')
const program = require('commander')
const pkg = require('../package')
const colors = require('colors')

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

  console.log(``)
  console.log('WELCOME TO'.bold.blue)
  console.log(`REACT LIBRARY GENERATOR`.bold.blue)
  console.log(``)
  console.log(`   (∩｀-´)⊃`.bold.blue, `━☆`.red, `ﾟ.*･｡ﾟ`.bold.yellow)
  console.log(``)
  console.log('◉'.red, 'Make sure you are in the directory you want to generate React library into.')
  console.log(``)
  console.log('I want to create a library scaffold for you. Please tell me what do you want.'.cyan)

  await stepHandler(require('./prompts/name'))
  await stepHandler(require('./prompts/description'))
  await stepHandler(require('./prompts/author'))
  await stepHandler(require('./prompts/test'))
  await stepHandler(require('./prompts/docs'))
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
