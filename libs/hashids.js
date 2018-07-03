'use strict';

var Hashids = require("hashids");
var hashids = new Hashids('1766', 6,
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123567890');

module.exports = hashids;
