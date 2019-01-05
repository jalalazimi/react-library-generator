const prompts = require('prompts')
let canceled = false

module.exports = async () => {
  const { license } = await prompts([
    {
      type: 'text',
      name: 'license',
      message: 'License:',
      initial: 'MIT'
    }
  ], {
    onCancel: prompt => {
      console.log('The generator process has been terminated. Please try again.')
      canceled = true
      return false
    }
  })

  return { license, canceled }
}
