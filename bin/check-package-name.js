const npmName = require('npm-name');
const ora = require('ora');

module.exports = async (name) => {

  const isAvailable = await npmName(name);




  return isAvailable;


}
