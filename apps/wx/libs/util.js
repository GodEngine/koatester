'use strict'

function formatTime (time, format) {
  if (!time) {
    return '无'
  }
  var fTime = time * 1000
  var t = new Date(fTime)
  var tf = function (i) {
    return (i < 10 ? '0' : '') + i
  }
  return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
    switch (a) {
      case 'yyyy':
        return tf(t.getFullYear())
        break
      case 'MM':
        return tf(t.getMonth() + 1)
        break
      case 'mm':
        return tf(t.getMinutes())
        break
      case 'dd':
        return tf(t.getDate())
        break
      case 'HH':
        return tf(t.getHours())
        break
      case 'ss':
        return tf(t.getSeconds())
        break
    }
  })
}

function isLogin (obj) {
  return '1' // obj.cookies.get('queryblued');
}

function loginFunc (account, passwd) {
  var code = 1
  var msg = '账号或密码错误'
  if (account === 'admin' && passwd === 'admin') {
    code = 0
    msg = ''
  }
  return {code: code, msg: msg}
}

function setGroupType (type) {
  var str = ''
  switch (type) {
    case '0':
      str = '其他分类'
      break
    case '1':
      str = '生活休息'
      break
    case '2':
      str = '热门游戏'
      break
    case '3':
      str = '户外运动'
      break
    case '4':
      str = '兴趣爱好'
      break
    case '5':
      str = '同城'
      break
  }
  return str
}

function geo_get_distance (lat1, lon1, lat2, lon2) {
  if (lat1 == lat2 && lon1 == lon2) {
    return 0
  }

  var R = 6371 // km
  var dLat = (lat2 - lat1) * Math.PI / 180
  var dLon = (lon2 - lon1) * Math.PI / 180
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
        + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180)
        * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  var c = 2 * Math.asin(Math.sqrt(a))
  // debug('geo function value: ' + Math.round(R * c * 1000))
  return Math.round(R * c * 1000)
}

module.exports = {
  formatTime: formatTime,
  loginFunc: loginFunc,
  isLogin: isLogin,
  setGroupType: setGroupType,
  geo_get_distance: geo_get_distance
}
