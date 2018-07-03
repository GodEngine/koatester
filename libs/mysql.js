/**
 * mysql connector
 */

'use strict'

let req = require('bd-require')
let random = req('libs/random')
let mysql = require('mysql')
let thenifyAll = require('thenify-all')
let poolList = {}

module.exports = function (configs) {
  // 如果已经存在该数据库对应的链接，直接返回即可
  let mysqlServer = configs.host[random(0, configs.host.length - 1)]
  let mysqlConnection = mysql.createPool({
    connectionLimit: 1,
    host: mysqlServer,
    user: configs.user,
    password: configs.password,
    database: configs.database
  })

  // mysqlConnection.connect();

  // 将创建好的数据库链接存到变量中
  let connection = poolList[configs.key] = thenifyAll(mysqlConnection, mysqlConnection, ['query'])

  return connection
}
