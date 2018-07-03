'use strict'
var qconfMap = require('../configs/qconf')  // 这里边只存了qconf的路径
var config = require(`../configs/env/${process.env.NODE_DEV || process.env.NODE_ENV}`)  // 这里边存了账号密码 各种 以及手写的路径（在qconf取不到时 会拿这个）

/**
 * 获取qconf配置信息
 * 如果获取不到qconf的配置信息 则还是从js文件里读取
 * @param  {String} name 配置的key名
 * @return {Object}      一个配置信息的json对象
 */
module.exports = (name) => {
  // 这里会取到一个qconf的路径
  let path = qconfMap[name]
  // 本地直接返回local.js的配置信息
  if (process.env.NODE_ENV === 'local') {
    return config[name]
  } else {
    var qconf = require('node-qconf') // 获取qconf上的路径
    // 获取所有的host 返回一个Array
    let host = qconf.getAllHost(path)
    // 如果可以从qconf中获取到信息
    if (host && host.length) {
      // 去除所有的端口号信息
      host = host.map(function (item) {
        return item.split(':')[0]
      })
      console.log(`成功获取到qconf：${path} qconf ip 为： ${host}`)
      // 返回替换host后的qconf
      return Object.assign(config[name], {host: host})
    } else {
      console.log(`没有获取到qconf：${path}`)
      // 为防止qconf获取不到数据 当出现这种情况时 配置还是从 env下边的三个js文件中获取
      return config[name]
    }
  }
}
