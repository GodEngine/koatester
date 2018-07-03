/*
 * @Author: 孟闲闲 -- 获取当前用户BLUED版本号
 * @Date: 2018-05-29 10:55:40
 * @Last Modified by: mxx
 * @Last Modified time: 2018-05-29 11:03:06
 * @params
 *   content:  this
 *   env
 * @return
 *   numberV 版本号
 *   type 当前手机系统 iOS Android
 *   isAndroid 是不是安卓
 */

module.exports = (content, env) => {
  if (env === 'website') return {}

  let agent = content.header['user-agent']
  // Mozilla/5.0 (Linux; Android 5.1.1; vivo Xplay5A Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/39.0.0.0 Mobile Safari/537.36
  // Android/001502_01.5.2_0652_0441 (Asia/Shanghai) app/2 ibb/1.0.0"
  let reg = /(Android|iOS)\/\d+_(\d+\.\d+\.\d+)_/gi  // 01.5.2
  let end = reg.exec(agent)
  let type = end[1] // 手机型号
  let ver = end[2]  // 版本号
  let numberV = ver.split('.').reverse().join('') // 521
  let isAndroid = type === 'Android'
  return {
    version: ~~numberV,
    type,
    isAndroid
  }
}
