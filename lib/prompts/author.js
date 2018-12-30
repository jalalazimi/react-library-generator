const prompts = require('prompts')
const colors = require('colors')
let canceled = false

module.exports = async () => {
  console.log('>'.cyan + ' Please enter your information:'.bold)
  //Todo: check email validation
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
    onCancel: prompt => {
      console.log('Try again later')
      canceled = true
      return false
    }
  })

  return { author: `${name}${email && ` <${email}>`}${url && ` <${url}>`}`, canceled }
}
