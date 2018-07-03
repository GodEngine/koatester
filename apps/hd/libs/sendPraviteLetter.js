/*
*
*  @params           @discription                        @type
*
*  uid               send messsage uid                   Number
*  target_uid        accept message uid                  Number
*  content           need send private message text      String
*
*  example:
*   let sendData = {
*      uid : 1,
*      target_uid: 2,
*      content: 'congratulation to you send message success'
*    }
*
*/
const qconf = require('../../../libs/qconf.js')
const urllib = require('urllib')

module.exports = function * (queryData) {
  let url = ``
  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    content: JSON.stringify(queryData)
  }

  try {
    let resp = urllib.request(url, options, function (res) {
      return res
    })

    return resp.status === 200 ? JSON.parse(resp.data.toString()) : false
  } catch (err) {
    console.log(err)
    return false
  }
}
