/**
 * Send request
 * 0.3.0
 *
 * @param  {String} endpoint
 * @param  {String} method {GET/POST} Default GET
 * @param  {Object} data request body {Object/FormData}
 * @return {Promise}
 *
 * @Author: Liu Qian <qianliu>
 * @Email:  112486391@qq.com
 */

import checkType from './checkType'
import obj2qs from './obj2qs'

export const GET = 'GET'
export const POST = 'POST'

export default ({
  endpoint,
  method = GET,
  data = {}
} = {}) => {
  if (!endpoint) {
    throw new Error('{endpoint} must be specified.')
  }

  if (!([GET, POST].includes(method))) {
    throw new Error(`{method} must be ${GET} or ${POST}.`)
  }

  if (!checkType(data, 'Object')) {
    throw new Error('{data} must be a Object.')
  }

  const fetchOpts = { method }

  if (method === GET) {
    const querystring = obj2qs(data)
    if (querystring) {
      endpoint += `?${querystring}`
    }
  } else {
    // POST FormData
    const fd = new FormData()
    Object.keys(data).map(k => fd.append(k, data[k]))

    fetchOpts['body'] = fd
  }

  return new Promise((resolve, reject) => {
    fetch(endpoint, fetchOpts)
      .then(res => res.json())
      .then(resolve)
      .catch((err) => {
        console.error(err)
        reject(err)
      })
  })
}
