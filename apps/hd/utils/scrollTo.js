/**
 * 在指定毫秒内，滚动页面到某处
 *
 * @param {number} to   页面滚动到的位置
 * @param {number} time 指定毫秒内
 *
 * Created by 刘谦 <qianliu> 112486391@qq.com
 * on 2017-01-25 19:11
 */

import getScrollTop from './getScrollTop'
import setScrollTop from './setScrollTop'

export default (to, time) => {
  const from = getScrollTop()
  const runEvery = 5 // ms

  to = parseInt(to)
  time /= runEvery

  // 设置一个 节流函数 来避免频发触发
  let i = 0 // px
  const interval = setInterval(() => {
    i++
    setScrollTop((to - from) / time * i + from)

    if (i >= time) {
      clearInterval(interval)
    }
  }, runEvery)
}
