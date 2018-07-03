'use strict'

var moment = require('moment')
var util = require('util')
var req = require('bd-require')
var hashids = req('libs/hashids')
var qconf = req('libs/qconf')
var urllib = require('urllib')
var postLogUri = req('configs/backend').charon
var Agent = require('agentkeepalive')
var agent = new Agent({
  keepAlive: true
})
var path = '/redirect'

module.exports = function (router, logger, configs) {
  var logTool = req('libs/utils.js').loggers(logger)
  router.get('/', function*(next) {
    var url = this.query.url
    var href = url

    logTool.access(this, {
      redirect: url
    })
    const { url_scheme: urlScheme = '0' } = this.query

    if (Number(urlScheme) === 1) {
      yield this.render('index', { url })
    } else {
      this.redirect(url)
    }
  })

  // 收集用户信息页面
  router.get('/collect', function*(next) {
    var ua = this.request.header['user-agent']
    var date = moment().format('YYYYMMDD')
    var url = this.query.url

    logTool.access(this, {
      redirect: url
    })

    var text = '谢谢'
    var html = `
    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html;charset=utf8">
        <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
        <title>Blued</title>
        <style>
        html{height:100%;}
        body{position: relative; top:40%;text-align:center;font-size: 24px; color:#000;}
        </style>
      </head>
      <body>
      ${text}
      </body>
    </html>
    `
    this.body = html
  })
}
