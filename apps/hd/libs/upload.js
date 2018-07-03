/**
 */

const req = require('bd-require')
const upload = req('libs/upload')
// const { cdnBase } = require('./constants') // 旧的 七牛地址
const { cdnBase } = req('libs/qn') // 使用新的地址

const prefix = 'hd'

module.exports = function * ({ key, filePath }) {
  if (!key.startsWith('/')) {
    throw new Error('{key} must starts with /')
  }

  const res = yield upload({ key: `${prefix}${key}`, filePath })

  if (res) {
    return `${cdnBase}/${prefix}${key}`
  } else {
    return false
  }
}
