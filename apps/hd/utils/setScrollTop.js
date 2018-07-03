/**
 * 兼容设置 scroll top
 *
 * @param {number} top
 *
 * Created by 刘谦 <qianliu> 112486391@qq.com
 * on 2017-01-25 19:33
 */

// eslint-disable-next-line no-return-assign
export default top =>
  document.documentElement.scrollTop = document.body.scrollTop = top
