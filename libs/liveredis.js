// 'use strict'
//
// var req = require('bd-require')
// var random = req('libs/random')
// var redis = require('redis')
// var thenifyAll = require('thenify-all')
//
// // live init
// var liveRedisServers = req('libs/qconf')('liveRedis').host
// var liveRedisServer = liveRedisServers[random(0, liveRedisServers.length - 1)]
//
// var liveRedisClient = redis.createClient('6379', liveRedisServer)
// var liveRedisCo = thenifyAll(liveRedisClient, liveRedisClient, [
//   'zcard',
//   'hgetall',
//   'hmget',
//   'hset',
//   'zrevrange',
//   'zrevrank',
//   'hget',
//   'smembers',
//   'sismember',
//   'exists',
//   'sadd',
//   'scard',
//   'zrange',
//   'hincrby',
//   'incrby',
//   'zscore',
//   'get',
//   'set',
//   'incr',
//   'het',
//   'del',
//   'decr',
//   'srandmember',
//   'decrby',
//   'hkeys'
// ])
//
// module.exports = liveRedisCo
