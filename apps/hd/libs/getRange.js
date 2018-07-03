/**
 *用于获取指定范围内的key对应的value
 */

const getKey = require('get-key-range')

let obj = {
  0: '0',
  1: '43.42',
  2: '49.21',
  3: '53.40',
  4: '78.33',
  '5-20': '79.46',
  '21-25': '80.48',
  '26-27': '81.42'
}
module.exports = (key) => getKey(obj, key) || '99.99'
