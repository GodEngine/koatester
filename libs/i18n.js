'use strict';

var cnText = require('../data/i18n/cn.js');
var enText = require('../data/i18n/en.js');
var twText = require('../data/i18n/tw.js');

module.exports = function(lang) {
  var obj;
  switch (lang) {
  case 'cn':
    obj = cnText;
    break;
  case 'tw':
    obj = twText;
    break;
  default:
    obj = enText;
  }
  return obj;
}
