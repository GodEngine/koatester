'use strict'

const req = require('bd-require')
const ilang = req('libs/ilang')
const isLocal = process.env.NODE_ENV === 'local'

module.exports = function (router, logger) {
  router.get('/', function*(next) {
    var ua = this.req.headers['user-agent']
    var al = this.req.headers['accept-language']
    var lan = ilang(ua, al)

    // 调试后门
    if (isLocal) {
      lan = this.query.lan || lan
    }
    var lanText = req('libs/ilangText')(lan)
    this.state = {
      title: lanText['403Text']
    }
    yield this.render('index')
    yield next
  })
}
