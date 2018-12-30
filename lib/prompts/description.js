const prompts = require('prompts')
let canceled = false

module.exports = async () => {

  const { description } = await prompts([
    {
      type: 'text',
      name: 'description',
      message: 'What is your package description?',
      initial: 'React component'
    }
  ], {
    onCancel: prompt => {
      console.log('Try again later')
      canceled = true
      return false
    }
  })

  return { description, canceled }
}
