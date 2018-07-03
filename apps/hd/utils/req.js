/**
 * Send request
 *
 * @param  {string}   endpoint
 * @param  {function} callback
 * @param  {object}   opts fetch options
 *   - {string} method - default GET
 *   - {object} data - POST data
 *
 * Created by 刘谦 <qianliu> 112486391@qq.com
 * on 2017-02-05 11:27
 */

export default ({ endpoint, callback = () => {}, opts = {} } = {}) => {
  if (!endpoint) {
    throw new Error('{endpoint} must be specified.')
  }

  const { method = 'GET', data = {} } = opts
  const fetchOpts = {
    method,
    headers: new Headers({ 'Accept': 'application/json' })
  }

  if (method !== 'GET') {
    fetchOpts['body'] = JSON.stringify(data)
  }

  fetch(endpoint, fetchOpts).then(res => res.json()).then(callback)
}
