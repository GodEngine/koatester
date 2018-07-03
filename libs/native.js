/**
 * @mdemo
 */

'use strict';
var cookie = require('cookie-cutter');

var serialize = function(obj) {
    var str = [];
    for(var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
};
var action = function(name, params ){
    if(!name){
        return false;
    }
    if(!cookie(window.document).get('native')){
        return false;
    }
    params = params|| {};
    params.action = name;

    window.location.href = 'http://native.blued.cn/?' + serialize(params);
};

var title = function(title){
    if(!title){
        return false;
    }
    action('changetitle', {title: title});
};
var navigation = function(latitude, longitude, location){
    if(!latitude || !longitude){
        return false;
    }
    action('navigation', {latitude: latitude, longitude: longitude, location: location});
};
var getQs = function (name) {
    var arr = location.search.split('?'),
        num = '';
    if(arr.length > 1) {
        var qs = arr[1].split('&');
        for(var i = 0; i < qs.length; i++) {
          if(qs[i].indexOf(name+'=') !== -1) {
            num = qs[i].split('=')[1];
          }
        }
        return num;
    } else {
        return false;
    }
}

module.exports = {
    action: action,
    title: title,
    navigation: navigation,
    getQs: getQs,
};
