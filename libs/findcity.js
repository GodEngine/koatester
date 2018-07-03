/**
 * @des
 * @nie
 */

'use strict'
var area = require('../data/newArea_zh')
var areaEn = require('../data/newArea_en.js')
var areaTw = require('../data/newArea_tw.js')

module.exports = function (num, lang) {
  var res = (lang === 'cn' || !lang ? '未知' : 'Unknown')
  if ((lang === undefined || lang === 'cn') && area[num]) {
    res = area[num].replace(/_/g, ' ')
  } else if (lang === 'tw' && areaTw[num]) {
    res = areaTw[num].replace(/_/g, ' ')
  } else if (lang !== undefined && areaEn[num]) {
    res = areaEn[num].replace(/_/g, ' ')
  }
  return res
}
