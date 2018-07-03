'use strict'
var base = 'https://dn-web-blued-cn.qbox.me/@/web/emoji/'
var emojis = {
  '发红包': 'a001.png'
}

/**
 * replace emoji
 * @param  {[string]} context [original context]
 * @return {[string]}     [replaced context]
 */
module.exports = function (context) {
  return context.replace(/\[[a-zA-Z\u4e00-\u9fa5]+\]/g, function (m) {
    var idx = m.substr(1, m.length - 2)
    var val = emojis[idx]
    return val ? transform(val, '$%$') : m
  })
}

var transform = function (val, split) {
  var url = base + val
  split = split || ''
  return split + url + split
}
