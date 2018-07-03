'use strict'

var req = require('bd-require')
var random = req('libs/random')
var redis = require('redis')
var thenifyAll = require('thenify-all')

// hermes init
var hermesRedisServers = req('libs/qconf')('hermesRedis').host
var hermesRedisServer = hermesRedisServers[random(0, hermesRedisServers.length - 1)]

var hermesRedisClient = redis.createClient('6379', hermesRedisServer, {
  return_buffers: true,
  detect_buffers: true
})
var hermesRedisCo = thenifyAll(hermesRedisClient, hermesRedisClient, [
  'hlen',
  'zcard',
  'hgetall',
  'get',
  'set',
  'hget',
  'hset',
  'hkeys',
  'hmget',
  'zrevrange',
  'zscore',
  'zrange',
  'sismember',
  'sadd',
  'scard',
  'smembers',
  'zadd',
  'zrem',
  'exists',
  'expire'
])

module.exports = hermesRedisCo
