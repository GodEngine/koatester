'use strict';

var area = require('../data/area_zh');

module.exports = function(num) {
  var res = '未知';
  if (area[num]) {
    res = area[num].replace(/_/g, ' ');
  }
  return res;
};
