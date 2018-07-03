/*
 * @Author: 孟闲闲 获取当前用户IP地址
 * @Date: 2018-04-18 11:28:09
 * @Last Modified by: mxx
 * @Last Modified time: 2018-04-18 14:10:49
 */

module.exports = (context) => {
  if (!context) throw new Error('context must be object')

  const ipString = context.header['x-forwarded-for'] || ''
  return ipString.split(',') || []
}
