/**
 * 判断参数类型
 *
 * @param  {any}    param
 * @param  {string} type
 * on 2017-02-17 15:35
 */

module.exports = (param, type) => {
  return Object.prototype.toString.call(param) === `[object ${type}]`
}
