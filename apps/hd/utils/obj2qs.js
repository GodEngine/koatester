/**
 * Convert object to querystring
 *
 * @param  {object} obj params
 * @return {string} querystring
 * on 2017-02-05 11:21
 */

import checkType from './checkType'

export default obj =>
  Object
    .keys(obj)
    .map(k => checkType(obj[k], 'Undefined') ? null : `${k}=${obj[k]}`)
    .filter(i => i) // Filter null
    .join('&')
