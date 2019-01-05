const prompts = require('prompts')
let canceled = false

module.exports = async () => {

  const { description } = await prompts([
    {
      type: 'text',
      name: 'description',
      message: 'Component description:',
      initial: 'React component'
    }
  ], {
    onCancel: prompt => {
      console.log('The generator process has been terminated. Please try again.')
      canceled = true
      return false
    }
  })

  return { description, canceled }
}
