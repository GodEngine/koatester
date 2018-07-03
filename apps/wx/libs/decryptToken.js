var jwt = require('jsonwebtoken')
var secret = '3vPk7fB0HcwL5V9E2AErHuR19HM389eYqdvQcndM'

module.exports = function (token, cb) {
  jwt.verify(token, secret, function (err, decodedToken) {
    if (err) {
      console.log(err)
      return
    }
    cb(null, decodedToken.passwd, decodedToken.email)
  })
}
