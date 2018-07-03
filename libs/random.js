'use strict';

module.exports = function(min, max) {
  if (typeof min != 'number' || typeof max != 'number') {
    return;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
