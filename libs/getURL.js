/**
 * plaer get private url
 */

var qiniu = require('qiniu');
var qiniuConfig = require('./qn');

qiniu.conf.ACCESS_KEY = qiniuConfig.accessKey;
qiniu.conf.SECRET_KEY = qiniuConfig.secretKey;

var domain = '7xodzp.media1.z0.glb.clouddn.com';

module.exports = function (key) {
  var baseUrl = qiniu.rs.makeBaseUrl(domain, key);
  var policy = new qiniu.rs.GetPolicy();
  return policy.makeRequest(baseUrl);
}
