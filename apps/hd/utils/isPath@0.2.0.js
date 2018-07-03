/**
 * Check current location hash path
 *
 * @param  {string} hashPath
 * @return {boolean}
 *
 * Created by 刘谦 <qianliu> 112486391@qq.com
 */

export default hashPath => location.hash.slice(1) === hashPath
