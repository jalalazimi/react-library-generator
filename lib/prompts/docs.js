const prompts = require('prompts')
let canceled = false

module.exports = async () => {
  const { docs } = await prompts([
    {
      type: 'select',
      name: 'docs',
      message: 'Documentation:',
      choices: [
        { title: 'Docz', value: 'docz' }
      ],
      initial: 0
    }
  ], {
    onCancel: prompt => {
      console.log('The generator process has been terminated. Please try again.')
      canceled = true
      return false
    }
  })

  return { docs, canceled }
}
