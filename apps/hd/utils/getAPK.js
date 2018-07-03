/**
 * 获取国内 Android APK 下载地址
 *
 * @param {Function} callback
 *
 * @Author: Liu Qian <qianliu>
 * @Email:  112486391@qq.com
 */

const WEB_VERSION_CONF = ((Date) => `//m.blued.cn/js/web_base_conf.js?t=${+new Date()}`)(Date)
const APK_PREFIX = 'http://www.blued.cn/getapp'
const CHANNEL = 'a66880'

export default (callback) => {
  if (!window._androidVersion) {
    const script = document.createElement('script')
    script.src = WEB_VERSION_CONF
    script.onload = () => {
      // Cache
      window._androidVersion = window._baseconf.android_info.version
      try {
        delete window._baseconf
      } catch (e) {
        window._baseconf = undefined
      }
      document.body.removeChild(script)

      callback(concatURL(window._androidVersion))
    }

    // Load script
    document.body.appendChild(script)
  } else {
    callback(concatURL(window._androidVersion))
  }
}

/**
 * Concat APK URL
 *
 * @param {String} androidVersion
 *
 * @return {String}
 */
function concatURL (androidVersion) {
  return `${APK_PREFIX}/${androidVersion}/${CHANNEL}/android`
}
