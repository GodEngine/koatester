'use strict'

const req = require('bd-require')
const tools = req('libs/utils')
const getWxSignature = require('../libs/getWxSignatureTest')

/**
 * Blued wx share相关的ticket获取
 * wxshare.js特供
 */
module.exports = function (router, logger) {
  const log = tools.loggers(logger)
  router.get('/signaturetest', function * () {
    log.access(this, {
      requestBody: this.request.body
    })
    let url = (this.header.referer || this.href).replace(/^http:/, 'https:').replace(/#.*$/, '')  // 将http修改为https & 删除#后的所有部分
    if (!url) {
      this.jsonp = {}
      return
    }
    let wxConfig = yield getWxSignature(url)

    this.jsonp = wxConfig
  })
}
