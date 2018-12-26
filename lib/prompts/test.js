const prompts = require('prompts')

module.exports = async () => {
  const { test } = await prompts([
    {
      type: 'select',
      name: 'test',
      message: 'Select your test tool:',
      choices: [
        { title: 'Ava', value: 'ava' }
      ],
      initial: 1
    }
  ], {
    onnCancel: prompt => {
      console.log('Try again later')
      return false
    }
  })

  return { test }
}
