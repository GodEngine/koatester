/**
 * 检测是否在微信中打开
 *
 * @return {Boolean}
 *
 * Created by 刘谦 <qianliu> 112486391@qq.com
 */
export default () => {
  const userAgent = window.navigator.userAgent

  return /micromessenger/i.test(userAgent)
}
