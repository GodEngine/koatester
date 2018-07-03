'use strict'

const moment = require('moment')
const zodiacTable = require('../data/chinese_zodiacs_table.json')

/**
 * 获取某个日期所对应的属相
 * @param  {String} date YYYYMMDD格式的时间字符串
 * @return {Number}      一个属相对应的数字
 */
module.exports = date => {
  let result = moment(date, 'YYYYMMDD')
  let year = Number(result.format('YYYY')) // 根据年份取出对应的某一年的信息
  let timestamp = result.format('X') // 取出传入参数的时间戳
  let zodiacInfo = zodiacTable[year]

  if (timestamp < zodiacInfo.spring_festival) {
    return zodiacInfo.early_zodiac
  } else {
    return zodiacInfo.zodiac
  }
}
