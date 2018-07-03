/*
 * @Last modified time: 2018-07-03T20:42:48+08:00
 */

const APP_NAME = '2018-bird'
const req = require('bd-require')
const qconf = req('libs/qconf')
const { loggers } = req('libs/utils')
const hashids = req('libs/hashids')
const moment = require('moment')
const interUtile = require('../libs/internationlUtils@0.1.0.js')
const isLocal = process.env.NODE_DEV === 'local_dev'
const isTest = process.env.NODE_ENV === 'development'
const isPro = process.env.NODE_ENV === 'production'

// 抽奖用户数
const uidList = [4557380, 3527, 727034, 642126, 5469313, 3927559, 5551906, 82878]

module.exports = (router, logger) => {
  // 渲染页面
  const log = loggers(logger)
  router.get(`/${APP_NAME}`, function * (next) {
    try {
      let {result, env, userid} = interUtile({
        context: this
      })

      let feConfig = {
        env,
        isStart,
        isEnd,
        usersInfo
      }
      result = Object.assign({}, result, {
        feConfig: encodeURIComponent(JSON.stringify(feConfig))
      })

      this.state = result
      yield this.render(APP_NAME)
      yield next
    } catch (err) {
      log.error(this, err)
    } finally {
      log.access(this)
    }
  })
}
