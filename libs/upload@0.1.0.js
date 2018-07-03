/**
 * 上传文件至七牛
 * on 2017-02-17 11:18
 */

const qiniuConf = require('./qn')
const qiniu = require('qiniu')

// 设置秘钥
qiniu.conf.ACCESS_KEY = qiniuConf.accessKey
qiniu.conf.SECRET_KEY = qiniuConf.secretKey

// 构建上传策略函数
function makeUpToken (key, isIdentify) {
  // 要上传的空间  --- 在视频鉴黄的处理中 敏叔说使用这个 ‘blued’ 作为 bucket
  // 如果是 鉴黄 isIdentify 则用 ‘blued’
  const bucket = isIdentify ? 'blued' : qiniuConf.bucket

  const putPolicy = new qiniu.rs.PutPolicy(`${bucket}:${key}`)

  return putPolicy.token()
}

/**
 * 构造上传函数
 *
 * @param {object}
 *   - {string} key 上传到七牛后保存的文件名 e.g. my-pic.png
 *   - {string} filePath 本地文件路径
 * @return {object}
 *   - {boolean} status 上传成功或失败
 *       - true: key
 *       - false: err
 */
module.exports = function ({ key, filePath, isIdentify } = {}) {
  const extra = new qiniu.io.PutExtra()
  const uptoken = makeUpToken(key, isIdentify)

  const promise = new Promise((resolve, reject) => {
    qiniu.io.putFile(uptoken, key, filePath, extra,
      (err, ret) => !err
        ? resolve({ status: true, key: ret.key })
        : reject({ status: false, err })
    )
  })

  return promise
}
