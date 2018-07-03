/*
 * 系统发送私信
 * @Date: 2018-06-06 16:20:05
 * @Last Modified by: mxx
 * @Last Modified time: 2018-06-19 17:52:47
 */

/**
 * 发送私信消息
 * @param  {[type]} uid [谁来发送此私信]
 * @param  {[type]} target_uid  [接受本次私信的UID]
 * @param  {[type]} contents  [私信内容]
 * @return {[type]}           [description]
 */
const isLocal = process.env.NODE_DEV === 'local_dev'
const urllib = require('urllib')
const req = require('bd-require')
const qconf = req('libs/qconf')

// let charonConf
// let charonDomain
// if (!isLocal) {
let  charonConf = qconf('charon')
let  charonDomain = `http://${charonConf.host[0]}:${charonConf.port}/send`
// }

module.exports = function * (queryData) {
  // if (isLocal) return false
  let { uid, target_uid: targetUid, contents } = queryData
  if (!uid || !targetUid || !contents) return false

  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    content: JSON.stringify({
      "uid": uid,
      "target_uid": targetUid,
      "contents": contents
    })
  }

  try {
    let resp = yield urllib.request(charonDomain, options)

    return resp.status === 200 ? JSON.parse(resp.data.toString()) : false
  } catch (err) {
    console.log(err, 'err -- message')
    return false
  }
}
