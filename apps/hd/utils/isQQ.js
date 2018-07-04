/**
 * 检测是否在 QQ 中打开，但要排除 QQ 浏览器
 *
 * @return {Boolean}
 */
export default () => {
  const userAgent = window.navigator.userAgent

  return /qq/i.test(userAgent) && !(/^qqbrowser/i.test(userAgent))
}
