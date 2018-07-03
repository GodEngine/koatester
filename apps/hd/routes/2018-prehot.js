/**
 * 程功
 * @type {[type]}
 */
const req = require('bd-require')
const hashids = req('libs/hashids')
const moment = require('moment')
const tools = req('libs/utils')
const interUtile = require('../libs/internationlUtils@0.1.0.js')
const isPro = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'local'
// 所有参与抽奖的用户
const uids = []
const APP_NAME = '2018-prehot'
const deadline = '2018-06-03 12:00:00'
// const deadline = '2018-05-03 12:00:00'
module.exports = (router, logger) => {
  let log = tools.loggers(logger)
  router.get(`/${APP_NAME}`, function * (next) {
    try {
      let { result, env, userid } = interUtile({
        context: this,
        cities: ['cn']
      })
      // 默认值
      let userInfo = {
        name: '暂无此人',
        stateText: '暂无',
        inWhiteList: false
      }
      let vipInfo = {}
      let cardInfo = {
        hasNotUsed: true
      }
      // 测试数据
      // env = 'native'
      // userid = '9337869'
      if (userid && env === 'native') {
        vipInfo = yield getStatus(userid)
        userInfo.isvip = vipInfo.status !== 'normal'
        userInfo.stateText = getStatusText(vipInfo.status)
        cardInfo = yield getCardInfo({userid, vipInfo})
        userInfo.inWhiteList = cardInfo.inWhiteList
      }

      // 跳转viper介绍列表页地址
      let viperListUrl = isPro
      ? 'https://app.blued.cn/msg/viper/viplist?from=prehot'
      : 'http://app-testenv.blued.cn/msg/viper/viplist?from=prehot'

      let isover = moment().isAfter(moment(deadline))
      let config = {
        isover,
        env,
        uid: hashids.encode(userid),
        userInfo,
        cardInfo,
        viperListUrl
      }
      log.access(this, {
        key: 'prehot',
        userid
      })
      this.state = Object.assign({}, result, {
        title: '就想提前遇到你',
        feConfig: encodeURIComponent(JSON.stringify(config))
      })

      yield this.render(APP_NAME)
      yield next
    } catch (error) {
      log.error(this, error, {
        msg: `${APP_NAME} -- error`
      })
    }
  })
  // 已经刮完刮刮卡
  router.get(`/${APP_NAME}/scratch/:uid`, function *() {
    let {uid} = this.params
    try {
    } catch (error) {
      code = 500
      log.error(this, error, {
        msg: `${APP_NAME} -- hasScratch -error`
      })
    } finally {
      this.body = {

      }
    }
  })
}
  /**
   * 获取用户是否为vip及svip
   * @param  {[type]}    uid [description]
   * @return {Generator}     [description]
   */
function * getStatus (uid) {
  return {
    status: 'normal',
    endtime: ''
  }
}
/**
 * 获取不同会员状态对应的文案
 * @param  {[type]} status [description]
 * @return {[type]}        [description]
 */
function getStatusText (status) {
  const texts = {
    'normal': '您还不是会员',
    'annualsvip': '年SVIP',
    'svip': 'SVIP',
    'annualvip': '年VIP',
    'vip': 'VIP'
  }
  return texts[status || 'normal']
}
/**
 * 当前用户的抽奖信息
 * @param  {[type]}    obj [{userid, }]
 * @return {Generator}     [
 cardInfo: {
   inWhiteList: false,  // 是否是白名单用户
   cardType: 'a',   // 奖品类型
   hasScratched: false, // 是否已经刮开
   hasUsed: false,     // 是否已使用（是否是会员）
   payCode             // 支付码
 }
 */
function * getCardInfo (obj) {
  let uid = Number(obj.userid)
  // 默认值
  let cardType = null
  let payCode = {vip: 0, svip: 0}
  let hasScratched = false
  let hasNotUsed = obj.vipInfo.status === 'normal'
  if (uids.a.indexOf(uid) > -1) {
    cardType = 'a'
  } else if (uids.b.indexOf(uid) > -1) {
    cardType = 'b'
  } else if (uids.c.indexOf(uid) > -1) {
    cardType = 'c'
  } else {

    // 非白名单用户
    return {
      inWhiteList: false,
      cardType,
      hasScratched,
      hasNotUsed,
      payCode
    }
  }

  return {
    inWhiteList: true,
    cardType,
    hasScratched,
    hasNotUsed,
    payCode
  }
}
