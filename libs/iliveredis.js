'use strict'

var req = require('bd-require')
var random = req('libs/random')
var redis = require('redis')
var thenifyAll = require('thenify-all')

// live init
var liveRedisServers = req('libs/qconf')('iliveRedis').host
var liveRedisServer = liveRedisServers[random(0, liveRedisServers.length - 1)]

var liveRedisClient = redis.createClient('6379', liveRedisServer)
var liveRedisCo = thenifyAll(liveRedisClient, liveRedisClient, [
  'sadd',
  'incr',
  'zcard',
  'hgetall',
  'hmget',
  'zrevrange',
  'zrevrank',
  'hget',
  'zscore',
  'zincrby',
  'hset',
  'smembers',
  'sismember',
  'set',
  'get',
  'exists',
  'hincrby',
  'scard'
])

module.exports = liveRedisCo
