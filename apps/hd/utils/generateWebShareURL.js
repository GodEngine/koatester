/**
 * Generate Web Share URL
 * http://doc.oschina.net/jarvis?t=231779
 *
 * Warning:
 *   - 仅支持端内 WebView 发起
 *   - 国际版 iOS 暂不支持 title 参数，如果要指定，请在 <head /> 内设置
 *     <meta name="title" content="XXX" />
 *
 * @param {Object}
 *   @param {Boolean} isInternational
 *   @param {String} to - The share platform
 *     domestic: timeline/3rd(Wechat,Weibo,QQ...)
 *     international: timeline/facebook/twitter
 *   @param {String} type - Share type
 *     international: link/img
 *   @param {String} url
 *   @param {String} title
 *   @param {String} content
 *   @param {String} image
 *
 * @return {String}
 *
 * @Author: Liu Qian <qianliu>
 * @Email:  112486391@qq.com
 */
import checkType from './checkType'
import obj2qs from './obj2qs'

const HOST = '//common.blued.com'
const I18N_TO = {
  timeline: 'timeline',
  facebook: 'fb',
  twitter: 'twitter'
}
const I18N_SHARE_TYPE = {
  link: 0,
  img: 1
}

export default (
  { isInternational, to, type, url, title, content, image } = {}
) => {
  // Check common args
  if (!checkType(isInternational, 'Boolean')) {
    throw TypeError('{isInternational} must be a Boolean arg.')
  }
  // if (!checkType(isNative, 'Boolean')) {
  //   throw TypeError('{isNative} must be a Boolean arg.')
  // }

  // let protocol
  let params = {}

  // Required params
  if (isInternational) {
    // International
    if (!['timeline', 'facebook', 'twitter'].includes(to)) {
      throw Error('International must be specified {to}: `timeline` or `facebook` or `twitter`.')
    }
    if (!['link', 'img'].includes(type)) {
      throw Error('International must be specified {type}: `link` or `img`.')
    }

    // protocol = isNative ? '//' : 'iblued://'
    params.action = 'webshare'
    params.to = I18N_TO[to]
    params.type = I18N_SHARE_TYPE[type]
  } else {
    // Domestic
    // protocol = isNative ? '//' : 'blued://'
    params.action = to === 'timeline' ? 'post_feed' : 'webshare'
  }

  // Optional params
  if (url) {
    params.url = encodeURIComponent(url)
  }
  params = Object.assign({}, params, { title, content, image })
  const querystring = obj2qs(params)

  return `${HOST}?${querystring}`
}
