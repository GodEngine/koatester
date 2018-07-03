/**
 * @Author: 刘谦 <qianliu>
 * @Email:  112486391@qq.com
 */

const shell = require('shelljs')
const prompt = require('./_prompt.js')

prompt().then(({ oraInstance, args }) => {
  const child = shell.exec(`
    NODE_ENV=development webpack --hide-modules ${args}
  `, { async: true })

  // Stop and clear the ora when webpack started
  child.stdout.on('data', function (data) {
    if (data.toLowerCase().includes('webpack')) {
      oraInstance.stop()
      oraInstance.clear()
    }
  })
})
