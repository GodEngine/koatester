/**
 * 检查参数类型
 */

module.exports = (param, type) =>
  Object.prototype.toString.call(param) === `[object ${type}]`
