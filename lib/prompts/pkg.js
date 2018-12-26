const prompts = require('prompts')

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
    onnCancel: prompt => {
      console.log('Try again later')
      return false
    }
  })

  return { pkg }
}
