/**
 * 检查参数类型
 *
 * @param  {any}     param
 * @param  {string}  type
 * @return {boolean}
 *
 * Created by 刘谦 <qianliu> 112486391@qq.com
 * on 2017-02-16 15:06
 */

export default function (param, type) {
  return Object.prototype.toString.call(param) === `[object ${type}]`
}
