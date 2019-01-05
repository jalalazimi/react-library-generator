const prompts = require('prompts')
const colors = require('colors')
let canceled = false

module.exports = async () => {
  const { author = '' } = await prompts([
    {
      type: 'text',
      name: 'author',
      message: 'Author:',
      initial: ''
    }
  ], {
    onCancel: prompt => {
      console.log('The generator process has been terminated. Please try again.')
      canceled = true
      return false
    }
  })

  return { author, canceled }
}
