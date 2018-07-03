const req = require('bd-require')
const getFile = req('libs/qnFile.js')

module.exports = {
  getFile: function* (key, isPro) {
    let info = getFile(key, isPro)
    return info
  }
}
