'use strict'
const config = {
  production: {
    feedRedis: ['10.10.10.10', '']
  },
  development: {
    feedRedis: ['10.10.10.10', '']
  },
  local: {
    feedRedis: ['10.10.10.10', '']
  }
}
const env = process.env.NODE_ENV || 'production'
module.exports = config[env]
