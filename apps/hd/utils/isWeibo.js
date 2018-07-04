/**
 * 检测是否在新浪微博中打开
 *
 * @return {bool}
 */
export default () => {
  const userAgent = window.navigator.userAgent

  return /weibo/i.test(userAgent)
}
