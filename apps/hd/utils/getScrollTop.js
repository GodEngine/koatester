/**
 * 兼容获取 scrollTop
 * document.body.scrollTop | document.documentElement.scrollTop 必有一个能取到 top 值，另一个则为 0
 *
 * @return {number} scrollTop
 */

export default () => parseInt(
  document.body.scrollTop + document.documentElement.scrollTop
)
