const prompts = require('prompts')
const colors = require('colors')

module.exports = async () => {

  console.log('>'.cyan + ' Please enter your information:'.bold)
  const { name = '', email = '', url = '' } = await prompts([
    {
      type: 'text',
      name: 'name',
      message: 'Name:',
      initial: ''
    },
    {
      type: 'text',
      name: 'email',
      message: 'Email:',
      initial: ''
    },
    {
      type: 'text',
      name: 'url',
      message: 'Website:',
      initial: ''
    }
  ], {
    onnCancel: prompt => {
      console.log('Try again later')
      return false
    }
  })

  return { author: `${name}${email && ` <${email}>`}${url && ` <${url}>`}` }
}

