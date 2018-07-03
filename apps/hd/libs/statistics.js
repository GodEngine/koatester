/**
 * 埋点统计
 * @param {String} log
 */
module.exports = (log) => {
    var that = new Image()
    that.src = '/redirect?url=' + log
    that = null
}