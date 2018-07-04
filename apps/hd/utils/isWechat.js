/**
 * 检测是否在微信中打开
 *
 * @return {Boolean}
 */
export default () => {
  const userAgent = window.navigator.userAgent

  return /micromessenger/i.test(userAgent)
}
