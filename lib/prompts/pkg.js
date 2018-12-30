const prompts = require('prompts')
let canceled = false

module.exports = async () => {
  const { pkg } = await prompts([
    {
      type: 'select',
      name: 'pkg',
      message: 'Select your default package manage:',
      choices: [
        { title: 'YARN', value: 'yarn' },
        { title: 'NPM', value: 'npm' }
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

  return { pkg, canceled }
}
