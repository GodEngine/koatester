/**
 * Check activity is running or not
 *
 * @param {String} start YYYY-MM-DD HH:mm:ss
 * @param {String} end YYYY-MM-DD HH:mm:ss
 *
 * @return {Boolean}
 */

const moment = require('moment')

module.exports = (start, end) => {
  return moment().isBetween(moment(start), moment(end))
}
