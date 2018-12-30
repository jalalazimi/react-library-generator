const prompts = require('prompts')
let canceled = false

module.exports = async () => {
  const { docs } = await prompts([
    {
      type: 'select',
      name: 'docs',
      message: 'Select your documentation tool:',
      choices: [
        { title: 'Docz', value: 'docz' }
      ],
      initial: 0
    }
  ], {
    onCancel: prompt => {
      console.log('Try again later')
      canceled = true
      return false
    }
  })

  return { docs, canceled }
}
