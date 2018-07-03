/**
 *
 * 本配置文件为webapp中公共的配置文件，不涉及任何逻辑
 */

// 从mysql或者redis中查到的图片在端外使用时需要替换的域名
const cdnBase = 'https://dn-web-blued-cn.qbox.me'
const newCdnBase = 'https://www.bldimg.com'
// 不允许替换的静态资源域名
const doNotReplaceOrigin = [
  'staticsg.bldimg.com',
  'staticus.bldimg.com'
]
// 用户等级标识中vbadge的图片地址，gerUser.js包中请自行获取
const vbadgeIcon = {
  'yellow': 'https://os4ty6tab.qnssl.com/web/static/Tools/vbadge_yellow-d7bc8352.png',
  'blue': 'https://os4ty6tab.qnssl.com/web/static/Tools/vbadge_blue-4f861cdd.png',
  'purple': 'https://os4ty6tab.qnssl.com/web/static/Tools/vbadge_purple-84264987.png',
  'red': 'https://os4ty6tab.qnssl.com/web/static/Tools/vbadge_red-2cd9dc11.png',
  'redribbon': 'https://os4ty6tab.qnssl.com/web/static/Tools/vbadge_redribbon-c0d41333.png',
  'default': 'https://os4ty6tab.qnssl.com/web/static/Tools/vbadge_zero-898968c2.png'
}

// 默认的用户头像
const defaultAvatar = 'https://os4ty6tab.qnssl.com/cblued/static/default.1c2b240hi2sg3rh.png'

// 用于端外直播，动态和个人主页紧急屏蔽某些人的
const blackListObj = {
  '1': true
}

module.exports = {
  cdnBase,
  vbadgeIcon,
  defaultAvatar,
  blackListObj,
  doNotReplaceOrigin,
  newCdnBase
}
