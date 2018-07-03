const APP_NAME = '2018-vip'
const req = require('bd-require')
const {loggers} = req('libs/utils')
// const qconf = req('libs/qconf')
const hashids = req('libs/hashids')
// const ilang = req('libs/ilang')

const interUtile = require('../libs/internationlUtils@0.1.0.js')
const isPro = process.env.NODE_DEV === 'production'
const isLocal = process.env.NODE_DEV === 'local' || process.env.NODE_DEV === 'local_dev'

module.exports = (router, logger) => {
  const log = loggers(logger)
  // 渲染页面
  router.get(`/${APP_NAME}`, function * (next) {
    try {
      let {result, env, userid, lan} = interUtile({
        context: this
      })
      // env = 'native'
      log.access(this, {
        'msg': '2018-vip',
        userid
      })
      let vipListPage = isPro
      ? 'https://app.blued.cn/msg/viper/viplist?from=activityvip'
      : 'https://app-testenv.blued.cn/msg/viper/viplist?from=activityvip'

      let feConfig = {
        env,
        lan,
        vipListPage,
        uid: hashids.encode(userid)
      }

      this.state = Object.assign({title: 'Blued 诺曼底会员'}, result, {
        feConfig: encodeURIComponent(JSON.stringify(feConfig))
      })

      yield this.render(APP_NAME)
      yield next
    } catch (err) {
      console.log(err)
      log.error(this, {
        err
      })
    }
  })

  router.get(`/${APP_NAME}/issensitive/:str`, function * () {
    let code
    let msg = 'success'
    let status = 403
    let str = this.params.str
    str = decodeURIComponent(str)
    try {
    } catch (err) {
      console.log(err)
      code = 500
      msg = 'net error'
      log.error(this, {
        'key': '2018-vip',
        err
      })
    } finally {
      this.body = {
        code,
        msg,
        status
      }
    }
  })
}
