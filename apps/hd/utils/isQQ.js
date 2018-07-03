/**
 * 检测是否在 QQ 中打开，但要排除 QQ 浏览器
 *
 * @return {Boolean}
 *
 * Created by 刘谦 <qianliu> 112486391@qq.com
 */
export default () => {
  const userAgent = window.navigator.userAgent

  return /qq/i.test(userAgent) && !(/^qqbrowser/i.test(userAgent))
}
