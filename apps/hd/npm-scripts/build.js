/**
 * @Author: 刘谦 <qianliu>
 * @Email:  112486391@qq.com
 */

const shell = require('shelljs')
const prompt = require('./_prompt.js')

prompt().then(({ oraInstance, args }) => {
  const child = shell.exec(`
    NODE_ENV=production webpack --config webpack.config.babel.js --progress --hide-modules ${args}
  `, { async: true })

  // Stop and clear the ora when webpack compile started
  // Webpack will output logs on `stderr` with production mode
  child.stderr.on('data', function (data) {
    if (data.toLowerCase().includes('compiling')) {
      oraInstance.stop()
      oraInstance.clear()
    }
  })
})
