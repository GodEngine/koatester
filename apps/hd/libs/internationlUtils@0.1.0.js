 /**
  * 运营活动用的lib
  * 0.1.0
  *
  * @param  {Array} cities    // 国际运营活动涉及的地区（语言）
  * @param  {object} context    // router中传入的this对象
  * @param  {string} lankey     // 多语言语言包中对应的key
  *
  * 提供功能包括（持续扩充）：
  * @return {object}
  * [required]
  *   - result      {object}      包含百度统计的result对象，可以存放其他放置于handlebar模板中的数据
  *   - lanPackage  {object}      多语言的语言包，不提供lankey参数时返回{}
  *   - lan         {string}      当前的语言环境，不在给定的cities中和默认的[tw,en,cn]中时默认取en（国际版的风俗）
  *   - env         {string}      native Or website，判断端内端外
  *   - testtime    {string}      测试环境下拿到url中的测试用时间
  * Created by 程功 <chenggong> 102715090@qq.com
  */

const req = require('bd-require')
const ilang = req('libs/ilang')

const processEnv = process.env.NODE_ENV
const isDev = (processEnv !== 'production')

const language = ['cn', 'en', 'es', 'fr', 'id', 'ja', 'ko', 'pt', 'th', 'tw', 'vi']

module.exports = ({context, cities, lankey}) => {
  if (!context.req) {
    throw new Error('{context} must be offered')
  }
  // i18n
  const ua = context.req.headers['user-agent']
  const al = context.req.headers['accept-language']
  let cityMap = cities || language
  let lan = ilang(ua, al)
  // 如果检测为不支持的语言，需要指定为英语
  if (cityMap.indexOf(lan) === -1) {
    lan = 'en'
  }

  // 调试时间
  let testtime = null
  if (isDev) {
    lan = context.query.lan || lan
    testtime = context.query.testtime
  }

  // result为存放在handlebar模板中的值（常用的百度统计）
  let result = {
    baiduStatistics: context.baidu_statistics,
    sharebar: context.sharebar,
    wxshare: context.wxshare
  }

  // 判断端内端外
  let env = 'website'

  let output = {
    lan: lan,
    result,
    env,
    testtime
  }

  // 获取国际化语言包
  if (lankey) {
    output = Object.assign(output, {
      lanPackage: req(`data/international/${lan}.js`)[lankey] || {}
    })
  }

  return output
}
