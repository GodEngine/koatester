/*
 * @Last modified by:   godengine
 * @Last modified time: 2018-07-05T10:12:31+08:00
 */
const req = require('bd-require')
const hashids = req('libs/hashids')
const { loggers } = req('libs/utils')
const tools = req('libs/utils')
const moment = require('moment')
const interUtile = require('../libs/internationlUtils@0.1.0.js')
const isPro = process.env.NODE_ENV === 'production'
const APP_NAME = 'marry'

module.exports = (router, logger) => {
  let log = tools.loggers(logger)
  router.get(`/${APP_NAME}`, function * (next) {
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
