const process = require('process')
const program = require('commander')
const pkg = require('../package')
const colors = require('colors')

const packageData = {}
const stepHandler = async fn => {
  const response = await fn()
  if (response.canceled) { process.exit(1) }
  if (response.retry) {
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
  console.log(`
       ________                  _____ 
       ___  __ \\__________ ________  /_
       __  /_/ /  _ \\  __ \`/  ___/  __/
       _  _, _//  __/ /_/ // /__ / /_  
       /_/ |_| \\___/\\__,_/ \\___/ \\__/ 
         LIBRARY GENERATOR V${pkg.version}      
  `.cyan.blue)
  console.log(``)
  console.log('◉'.red, 'Make sure you are in the directory you want to generate React library into.')
  console.log(``)
  console.log('I want to create a scaffold for your React library. Please tell me what do you want.'.cyan)

  await stepHandler(require('./prompts/name'))
  await stepHandler(require('./prompts/description'))
  await stepHandler(require('./prompts/author'))
  await stepHandler(require('./prompts/test'))
  await stepHandler(require('./prompts/docs'))
  await stepHandler(require('./prompts/pkg'))

  await require('./library-genrator')(packageData)

  console.log(`Success!`.green)
  console.log(`For starting development :`)
  console.log(`$ cd ${packageData.name}/`.blue)
  console.log(`$ ${packageData.pkg} start`.blue)
  console.log(``)
  console.log(`Keep on rocking \u{1f918}`)
}

module
  .exports()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
