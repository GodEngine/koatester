'use strict'

/**
 *  越南：   vi-vn
 *  韩国：   ko-kr
 *  泰国：   th-th
 *  日本：   ja-jp
 *  法国：   fr-fr
 *  西班牙：  es-es
 *  葡萄牙：  pt-pt
 *  简体：   cn
 *  繁体：   tw
 *  英语：   en
 *  印尼：   id-id
 */

const language = ['cn', 'en', 'es', 'fr', 'id', 'ja', 'ko', 'pt', 'th', 'tw', 'vi']

// 默认返回英文
module.exports = function (ua, al) {
  var lang = 'en'
  // ua 或者 al 存在获取不到的奇葩情况，所以容错防止报错，如果遇到就直接返回‘en’
  if (!ua || !al) {
    return lang
  }

  if (typeof al === 'string') {
    if (/zh-cn/i.test(al)) {
      return 'cn'
    } else if (/zh-tw/i.test(al)) {
      return 'tw'
    } else if (/en-us/i.test(al)) {
      return 'en'
    }
    var la = al.slice(0, 2).toLowerCase() // 语言
    if (language.indexOf(la) >= 0) {
      return la
    } else {
      return lang
    }
  }
  return lang
}
