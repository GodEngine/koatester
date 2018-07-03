'use strict';

var PHPUnserialize = require('php-unserialize');
module.exports = function(data, type) {
	type = type || 'arr'; // 包裹容器 arr/obj

	var _data = PHPUnserialize.unserialize(data)

	if (type == 'arr') return toArray(_data);
	if (type == 'obj') return _data;
}

var toArray = function(data) {
  var arr = [];
  var keys = Object.keys(data);
  keys.map(function(key) {
  	arr.push(data[key]);
  });
  return arr;
}
