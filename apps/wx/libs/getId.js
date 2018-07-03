'use strict'
const req = require('bd-require')
const hashids = req('libs/hashids')

// 本地环境 ID可以不用加密
// 线上缓解 ID必须加密
module.exports = id => {
  // 调试后门
  if (process.env.NODE_ENV === 'local') {
    if (id && /[a-zA-Z]/.test(id)) {
      [id] = hashids.decode(id)
    }
  } else {
    id = hashids.decode(id)[0]
  }

  return `${id}`
}
