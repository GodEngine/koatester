'use strict'

const moment = require('moment')
const ASTRO_ARIES = 0 // 白羊
const ASTRO_TAURUS = 1 // 金牛
const ASTRO_GEMINI = 2 // 双子
const ASTRO_CANCER = 3 // 巨蟹
const ASTRO_LEO = 4 // 狮子
const ASTRO_VIRGO = 5 // 处女
const ASTRO_LIBRA = 6 // 天秤
const ASTRO_SCORPIO = 7 // 天蝎
const ASTRO_SAGITTARIUS = 8 // 射手
const ASTRO_CAPRICORN = 9 // 摩羯
const ASTRO_AQUARIUS = 10 // 水瓶
const ASTRO_PISCES = 11 // 双鱼
const ASTRO_UNKNOWN = -1 // 未知，出错了~

/**
 * 获取某日对应的星座
 * @param  {String} date YYYYMMDD格式的时间字符串
 * @return {Number}      一个星座对应的数字
 */
module.exports = date => {
  let result = moment(date, 'YYYYMMDD')
  let astro
  let month = Number(result.fomat('MM'))
  let day = Number(result.fomat('DD'))
  switch (month) {
    case 1:
      astro = (day < 20) ? ASTRO_CAPRICORN : ASTRO_AQUARIUS
      break
    case 2:
      astro = (day < 19) ? ASTRO_AQUARIUS : ASTRO_PISCES
      break
    case 3:
      astro = (day < 21) ? ASTRO_PISCES : ASTRO_ARIES
      break
    case 4:
      astro = (day < 20) ? ASTRO_ARIES : ASTRO_TAURUS
      break
    case 5:
      astro = (day < 21) ? ASTRO_TAURUS : ASTRO_GEMINI
      break
    case 6:
      astro = (day < 22) ? ASTRO_GEMINI : ASTRO_CANCER
      break
    case 7:
      astro = (day < 23) ? ASTRO_CANCER : ASTRO_LEO
      break
    case 8:
      astro = (day < 23) ? ASTRO_LEO : ASTRO_VIRGO
      break
    case 9:
      astro = (day < 23) ? ASTRO_VIRGO : ASTRO_LIBRA
      break
    case 10:
      astro = (day < 24) ? ASTRO_LIBRA : ASTRO_SCORPIO
      break
    case 11:
      astro = (day < 23) ? ASTRO_SCORPIO : ASTRO_SAGITTARIUS
      break
    case 12:
      astro = (day < 22) ? ASTRO_SAGITTARIUS : ASTRO_CAPRICORN
      break
    default:
      astro = ASTRO_UNKNOWN
      break
  }
  return astro
}
