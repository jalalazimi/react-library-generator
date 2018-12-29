const prompts = require('prompts')

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
    onnCancel: prompt => {
      console.log('Try again later')
      return false
    }
  })

  return { docs }
}
