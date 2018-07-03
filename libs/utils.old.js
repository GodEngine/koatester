'use strict'
var logger = require('./logger')
function formatTime (time, format) {
  if (!time) {
    return '无'
  }
  var fTime = time * 1000
  var t = new Date(fTime)
  var tf = function (i) {
    return (i < 10 ? '0' : '') + i
  }
  return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
    switch (a) {
      case 'yyyy':
        return tf(t.getFullYear())
        break
      case 'MM':
        return tf(t.getMonth() + 1)
        break
      case 'mm':
        return tf(t.getMinutes())
        break
      case 'dd':
        return tf(t.getDate())
        break
      case 'HH':
        return tf(t.getHours())
        break
      case 'ss':
        return tf(t.getSeconds())
        break
    }
  })
}
function getWeekDay (day, time, lang) {
  // day 为Date.getDay()，不是指当前时间
  // time 单位为秒，不是指当前时间
  var str = ''
  var d = day + ''
  var createYyyyMmDd = formatTime(time, 'yyyy-MM-dd')
  var addDaySec = time + 86400
  var yesterday = formatTime(addDaySec, 'yyyy-MM-dd')
  var newDate = new Date()
  var nowYyyyMmDd = formatTime(Math.floor(newDate.getTime() / 1000), 'yyyy-MM-dd')
  if (createYyyyMmDd === nowYyyyMmDd) {
    d = '1001'
  }
  if (nowYyyyMmDd === yesterday) {
    d = '1002'
  }
  if (lang === 'cn' || lang === 'tw') {
    switch (d) {
      case '1':
        str = '周一'
        break
      case '2':
        str = '周二'
        break
      case '3':
        str = '周三'
        break
      case '4':
        str = '周四'
        break
      case '5':
        str = '周五'
        break
      case '6':
        str = '周六'
        break
      case '0':
        str = '周日'
        break
      case '1001':
        str = '今天'
        break
      case '1002':
        str = '昨天'
        break
    }
  } else {
    switch (d) {
      case '1':
        str = 'Mon'
        break
      case '2':
        str = 'Tue'
        break
      case '3':
        str = 'Wed'
        break
      case '4':
        str = 'Thur'
        break
      case '5':
        str = 'Fri'
        break
      case '6':
        str = 'Sat'
        break
      case '0':
        str = 'Sun'
        break
      case '1001':
        str = 'Today'
        break
      case '1002':
        str = 'Yesterday'
        break
    }
  }
  return str
}
function getMonth (month, lang) {
  var str = ''
  var m = month + ''
  if (lang === 'cn' || lang === 'tw') {
    switch (m) {
      case '01':
        str = '一月'
        break
      case '02':
        str = '二月'
        break
      case '03':
        str = '三月'
        break
      case '04':
        str = '四月'
        break
      case '05':
        str = '五月'
        break
      case '06':
        str = '六月'
        break
      case '07':
        str = '七月'
        break
      case '08':
        str = '八月'
        break
      case '09':
        str = '九月'
        break
      case '10':
        str = '十月'
        break
      case '11':
        str = '十一月'
        break
      case '12':
        str = '十二月'
        break
      case '13':
        str = '一月'
        break
    }
  } else {
    switch (m) {
      case '01':
        str = 'Jan'
        break
      case '02':
        str = 'Feb'
        break
      case '03':
        str = 'Mar'
        break
      case '04':
        str = 'Apr'
        break
      case '05':
        str = 'May'
        break
      case '06':
        str = 'Jun'
        break
      case '07':
        str = 'Jul'
        break
      case '08':
        str = 'Aug'
        break
      case '09':
        str = 'Sep'
        break
      case '10':
        str = 'Oct'
        break
      case '11':
        str = 'Nov'
        break
      case '12':
        str = 'Dec'
        break
      case '13':
        str = 'Jan'
        break
    }
  }
  return str
}
function numberAddComma (num) {
  var str = num + ''
  return str.split('').reverse().join('').replace(/(\d{3})/g, '$1,').replace(/\,$/, '').split('').reverse().join('')
}
// format response的body
function formatRes (me, code, message, data, extra) {
  var d = new Date()
  var response_time = d.getTime()
  var result = {
    code: code || 200,
    message: message || '',
    data: data || [],
    request_id: me.blued_request_id ? me.blued_request_id : '',
    request_time: me.blued_request_time ? (me.blued_request_time / 1000).toFixed(3) : 0,
    response_time: response_time ? (response_time / 1000).toFixed(3) : 0,
    extra: extra || {}
  }
  me.jsonp = result
}
/**
 * 打印error日志
 * @param  {[type]} _      这个参数被废弃了 之前是传递进来logger对象
 * @param  {Error} err     一个error对象
 * @param  {Object} me     koa的上下文
 */
function errorLogger (_, err, me) {
  let req = me.request
  logger(me).error({
    url: req.url,
    ips: req.ips
  }, err)
}
/**
 * 打access日志
 * @param  {[type]} _      这个参数被废弃了 之前是传递进来logger对象
 * @param  {Object} me     koa的上下文
 * @param  {String} userid 用户的id号
 */
function accessLogger (_, me, userid) {
  let req = me.request
  logger(me).info({
    url: req.url,
    ips: req.ips
  })
}
/**
 * 一个打log的套餐
 * @param  {[type]} _ 这个参数被废弃了 之前是传递进来logger对象
 * @return {Object}   返回error和access两个方法
 */
function loggers (_) {
  return {
    error (self, err, cusInfo) {
      var req = self.request
      var info = {
        url: req.url,
        ips: req.ips
      }
      !isEmptyObject(cusInfo) && Object.assign(info, cusInfo)
      logger(self).error(info, err)
    },
    access (self, cusInfo) {
      var req = self.request
      var info = {
        url: req.url,
        ips: req.ips
      }
      !isEmptyObject(cusInfo) && Object.assign(info, cusInfo)
      logger(self).info(info)
    },
    warn (self, cusInfo) {
      var req = self.request
      var info = {
        url: req.url,
        ips: req.ips
      }
      !isEmptyObject(cusInfo) && Object.assign(info, cusInfo)
      logger(self).warn(info)
    }
  }
}
// 判断传入参数是否为空object
// isEmptyObject({}) => true
function isEmptyObject (obj) {
  var isEmpty = true
  var t
  for (t in obj) {
    isEmpty = false
    break
  }
  return isEmpty
}
module.exports = {
  formatTime: formatTime,
  getWeekDay: getWeekDay,
  getMonth: getMonth,
  numberAddComma: numberAddComma,
  formatRes: formatRes,
  errorLogger: errorLogger,
  accessLogger: accessLogger,
  loggers: loggers,
  isEmptyObject: isEmptyObject
}
