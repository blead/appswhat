const config = (() => {
  try {
    return require('./config')
  } catch(error) {
    console.log('unable to find "config/config.js", falling back to "config/config.default.js"')
    return require('./config.default')
  }
})()

module.exports = config;
