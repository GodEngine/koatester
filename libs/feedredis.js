/**
 * feed redis connector
 */

'use strict'

var req = require('bd-require')
var redis = require('redis')
var random = req('libs/random')
var thenifyAll = require('thenify-all')

var feedRedisServers = req('libs/qconf')('feedRedis').host

var feedRedisServer = feedRedisServers[random(0, feedRedisServers.length - 1)]
var feedRedisClient = redis.createClient('6379', feedRedisServer)
var feedRedisCo = thenifyAll(feedRedisClient, feedRedisClient, [
  'hgetall',
  'zcard',
  'zrevrange',
  'hmget',
  'get',
  'hget',
  'zrange'
])

module.exports = feedRedisCo
