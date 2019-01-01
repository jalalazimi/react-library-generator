const prompts = require('prompts')
let canceled = false

module.exports = async () => {
  const { test } = await prompts([
    {
      type: 'select',
      name: 'test',
      message: 'Testing utility:',
      choices: [
        { title: 'Ava', value: 'ava' },
        { title: 'Jest', value: 'jest' }
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

  return { test, canceled }
}
