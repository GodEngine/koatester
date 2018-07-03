'use strict'

const language = ['cn', 'en', 'es', 'fr', 'id', 'ja', 'ko', 'pt', 'th', 'tw', 'vi']

var langPack = {}

language.forEach(function (item) {
  langPack[item] = require(`../data/international/${item}`)
})

// 默认返回英文
module.exports = function (lang) {
  return langPack[lang] || langPack['en']
}
