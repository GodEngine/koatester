/**
 * logger.js
 */

'use strict'

const LOGGER_TEXT = 'logger_'

let logger = require('tracer').colorConsole({
  dateformat: 'yyyy/mm/dd HH:MM:ss',
  format: [
    LOGGER_TEXT + '{{title}}: time[{{timestamp}}] {{message}} (in {{file}}:{{line}})',
    {
      error: LOGGER_TEXT + '{{title}}: {{timestamp}} {{message}} (in {{file}}:{{line}})'
    }
  ]
})

let headerHandler = (app, source) => {
  source = source || {}
  let responseTime = (new Date()).getTime()
  let obj = {
    uid: app.cookies.get('uid') || 0,
    href: app.request.href,
    header: JSON.stringify(app.request.header),
    ip: app.request.ip,
    request_time: app.blued_request_time ? (app.blued_request_time / 1000).toFixed(3) : 0,
    response_time: responseTime ? (responseTime / 1000).toFixed(3) : 0
  }
  obj = Object.assign(obj, source)
  return obj
}

let handerObj = (obj, err) => {
  let str = ''
  for (let i in obj) {
    str += i + '[' + obj[i] + ']' + ' '
  }
  if (err) {
    let errObj = {
      err_msg: err.message,
      err_name: err.name,
      err_stack: err.stack
    }
    for (let i in errObj) {
      str += i + '[' + errObj[i] + ']' + ' '
    }
  }
  return str
}

module.exports = function (app) {
  return {
    info: (source) => {
      source = source || {}
      let obj = headerHandler(app, source)
      let content = handerObj(obj)
      return {
        fun: logger.info(content)
      }
    },
    warn: (source) => {
      let obj = headerHandler(app, source)
      let content = handerObj(obj)
      logger.warn(content)
    },
    error: (source, e) => {
      let obj = headerHandler(app, source)
      let content = handerObj(obj, e)
      logger.error(content)
    }
  }
}
