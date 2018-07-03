/**
 * Check current location hash path
 *
 * @param  {string} hashPath
 * @return {boolean}
 *
 * Created by 刘谦 <qianliu> 112486391@qq.com
 * on 2017-01-24 16:43
 */
import 'core-js/fn/string/includes.js'
export default hashPath => location.hash.includes(hashPath)
