/**
 * 获取七牛的文件信息
 *
 */

const qiniuConf = require('./qn')
const qiniu = require('qiniu')

// 设置秘钥
qiniu.conf.ACCESS_KEY = qiniuConf.accessKey
qiniu.conf.SECRET_KEY = qiniuConf.secretKey

//构建bucketmanager对象
var client = new qiniu.rs.Client();

// 获取文件信息
module.exports = function (key, type) {

  // 要上传的空间
  let bucket = qiniuConf.bucket
  if (type) {
    // 使用鉴黄的空间
    bucket = 'blued'
  }

  let promise = new Promise((resolve, reject) => {
    client.stat(bucket, key, function (err, ret) {
      if (!err) {
        let data = ret
        // ret.hash, ret.fsize, ret.putTime, ret.mimeType
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
  return promise
}
