/**
 * @param {Str} ua req.headers['user-agent']
 * @param {Str} al req.headers['accept-language']
 * @description 获取语言类型。以客户端设置为主，客户端设置不存在时再获取头信息
 */

'use strict';

module.exports = function(ua, al) {
  // ua 或者 al 存在获取不到的奇葩情况，所以容错防止报错，如果遇到就直接返回‘cn’
  if (!ua || !al) {
    return 'cn';
  }
  var ma = ua.match(/( android| ios)\/.+( ibb\/)/ig);

  var getBrowserLang = function() {
    var lang = 'cn';
    if (typeof al == 'string') {
      lang = al.substr(0, 2) == 'zh' ? 'cn' : 'en';
    }
    return lang;
  }
  var getClientLang = function(str) {
    switch (str) {
    case 'zh-cn':
      return 'cn';
      break;
    case 'zh-tw':
      return 'tw';
      break;
    default:
      return 'en';
    }
  }

  return getBrowserLang();
}
