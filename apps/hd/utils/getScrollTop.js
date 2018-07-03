/**
 * 兼容获取 scrollTop
 * document.body.scrollTop | document.documentElement.scrollTop 必有一个能取到 top 值，另一个则为 0
 *
 * @return {number} scrollTop
 *
 * Created by 刘谦 <qianliu> 112486391@qq.com
 * on 2017-01-25 19:32
 */

export default () => parseInt(
  document.body.scrollTop + document.documentElement.scrollTop
)
