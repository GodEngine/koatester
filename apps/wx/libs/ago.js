/**
 * Format timestamp @lq 2015/07/30
 * 
 * @param {timestamp} t 需要转换的 timestamp
 * @param {bool:false} showTime 是否显示具体时间 hh:ii:ss
 * @param {int:7} boundry “天”数的判断边界，超过则显示完整时间字符串 YYYY-MM-DD
 *
 * @return {string} “刚刚 / xx分钟前 / xx小时前 / 昨天 / xx天前 / 超过{boundry}天 YYYY-MM-DD hh:ii:ss”
*/

'use strict';

module.exports = function(t, showTime, boundry) {
	showTime = showTime == undefined ? false : true;
	boundry = boundry || 7;

	t *= t.toString().length < 13 ? 1000 : 1; // 强制转换为毫秒级
	
	var date = new Date(t);
	var diff = (new Date().getTime() - t) / 1000;
	var dayDiff = Math.floor(diff / 86400);

	return dayDiff == 0 && 
		(
			diff < 60 && "刚刚" ||
			diff < 120 && "1 分钟前" ||
			diff < 3600 && Math.floor(diff / 60) + " 分钟前" ||
			diff < 7200 && "1 小时前" ||
			diff < 86400 && Math.floor(diff / 3600) + " 小时前"
		) ||
			dayDiff == 1 && "昨天" ||
			dayDiff <= boundry && dayDiff + " 天前" ||
			(
				date.toLocaleDateString() + (showTime ? ' ' + date.toLocaleTimeString() : '')
			);
};