/**
 * Send request@0.2.0
 *
 * @param  {string}   endpoint
 * @param  {string}   method {GET/POST} Default GET
 * @param  {object}   data request body {Object/FormData}
 * @param  {function} callback
 *
 * Created by 刘谦 <qianliu> 112486391@qq.com
 * on 2017-02-17 09:55
 */

import checkType from './checkType'
import obj2qs from './obj2qs'

const GET = 'GET'
const POST = 'POST'

export default ({
  endpoint,
  method = GET,
  data = {},
  callback = () => {}
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
  const fetchOpts = { method, credentials: 'same-origin' }

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
  // POST JSON
  // will deprecated
  // fetchOpts['headers'] = new Headers({ 'Accept': 'application/json' })
  // fetchOpts['body'] = JSON.stringify(data)
  fetch(endpoint, fetchOpts).then(res => res.json()).then(callback)
}
