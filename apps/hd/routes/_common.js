/*
 * @Author: 孟闲闲 -- 项目基本框架
 * @Date: 2018-03-12 16:19:54
 * @Last modified by:   godengine
 * @Last modified time: 2018-07-03T20:47:43+08:00
 */
const req = require('bd-require')
const hashids = req('libs/hashids')
const { loggers } = req('libs/utils')
const tools = req('libs/utils')
const moment = require('moment')
const interUtile = require('../libs/internationlUtils@0.1.0.js')
const isPro = process.env.NODE_ENV === 'production'
const APP_NAME = '2018-card'

module.exports = (router, logger) => {
  let log = tools.loggers(logger)
  router.get(`/${APP_NAME}`, function * (next){
    try {
      yield this.render(APP_NAME)
      yield next
    } catch (error) {
      log.error(this, error, {
        msg: `${APP_NAME} -- error`
      })
    }
  })
}
