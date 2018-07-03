const APP_NAME = 'public'

const req = require('bd-require')
const { loggers } = req('libs/utils')
const checkType = req('libs/checkType')
const upload = require('../libs/upload')

module.exports = (router, logger) => {
  const log = loggers(logger)
  // 上传七牛接口
  router.post(`/${APP_NAME}/upload`, require('koa-better-body')(), function * () {
    // 获取到做题人的uid和答案
    let code
    let msg = ''
    let key = ''
    const { photo } = this.request.fields || {}
    let random
    let photoUrl

    try {
      if (checkType(photo, 'String')) {
        photoUrl = photo || ''
      } else {
        const file = photo[0]
        const filePath = file.path
        random = Math.random()
        key = `/${APP_NAME}/${random}.jpg` // 避免缓存
        photoUrl = yield upload({ key, filePath })
      }
      code = photoUrl ? 200 : 500
      msg = 'success'
    } catch (err) {
      code = 500
      msg = 'failure'
      random = null
      log.error(this, err)
    } finally {
      console.log('pulic upload:' + random)
      this.body = {
        code,
        msg,
        photoUrl
      }
    }
  })
}
