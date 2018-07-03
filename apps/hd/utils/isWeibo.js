/**
 * 检测是否在新浪微博中打开
 *
 * @return {bool}
 *
 * Created by 刘谦 <qianliu> 112486391@qq.com
 */
export default () => {
  const userAgent = window.navigator.userAgent

  return /weibo/i.test(userAgent)
}
