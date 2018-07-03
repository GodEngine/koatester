const checkType = require('./checkType.js')
// 获取数组平均数
const getAverage = (array) => {
  if (!array || checkType(array) !== 'array') return
}

function convertBase64UrlToBlob (urlData) {
    // 去掉url的头，并转换为byte
  let bytes = window.atob(urlData.split(',')[1])
  let ab = new ArrayBuffer(bytes.length)
  let ia = new Uint8Array(ab)
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i)
  }
  return new Blob([ab], {type: 'image/png'})
}

module.exports = {
  getAverage,
  convertBase64UrlToBlob
}
