const prompts = require('prompts')

module.exports = async () => {

  const { description } = await prompts([
    {
      type: 'text',
      name: 'description',
      message: 'What is your package description?',
      initial: 'React component'
    }
  ])

  return { description }
}

