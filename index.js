'use strict'

var bd = require('bd')
var serve = require('koa-static')
var path = require('path')
var app = bd()
var logger = require('./libs/logger')
const fs = require('fs')
const url = require('url')
const isLocal = process.env.NODE_ENV === 'local'
const isTest = process.env.NODE_ENV === 'development'

app.init()
app.use(serve(path.join(__dirname, 'public')))

app.use(function* (next) {
  var d = new Date()
  this.polyfill = 'https://os4ty6tab.qnssl.com/web/static/msg/polyfill-6e7fe53f.js'
  this.momentjs = 'https://dn-web-blued-cn.qbox.me/web/static/iliveorders/moment-2b45b150.js'
  this.baidu_statistics = ``
  this.logger = logger(this)

  yield next
})

app.use(function* pageNotFound (next) {
  yield next

  if (this.status === 404) {
    this.status = 404
    switch (this.accepts('html', 'json')) {
      case 'html':
        this.redirect('/404')
        break
      case 'json':
        this.body = {
          message: 'Page Not Found'
        }
        break
      default:
        this.type = 'text'
        this.body = 'Page Not Found'
    }
  } else if (this.status === 403) {
    switch (this.accepts('html', 'json')) {
      case 'html':
        this.redirect('/403')
        break
      case 'json':
        this.body = {
          code: 403,
          message: 'Forbidden'
        }
        break
      default:
        this.type = 'text'
        this.body = 'Forbidden'
    }
  }
})

// 对于method：为get、protocol：为·http协议的请求重定向
app.use(function* (next) {
  let pass = isLocal === false // 本地
  let method = /get/ig.test(this.request.method) // 请求类型
  let protocol = /http$/ig.test(this.request.header['x-forwarded-proto']) // 协议
  let error = !/404$|403$/ig.test(this.path) // 过滤404、403

  if (pass && error && method && protocol) {
    this.redirect(this.request.href.replace(/^http:/ig, 'https:'))
  }

  yield next
})

app.middlewares()

app.listen(app.configs.port || 9000, function () {
  console.log('listen on', app.configs.port)
})

process.on('uncaughtException', function (err) {
  console.log(err)
  console.log(err.message)
  console.log(err.stack)
  process.exit()
})
