/**
 * 将URL中问号传参部分解析为对象
 * @param String
 * @return  Object
 *
 */

module.exports = (string) => {
  let reg = /([^?#=%&$]+)=([^?#=%&$]+)/gi
  let obj = {}
  string.replace(reg, ($1, $2, $3) => {
    obj[$2] = $3
  })
  return obj
}
