/**
 * Check current location hash path
 *
 * @param  {string} hashPath
 * @return {boolean}
 */

export default hashPath => location.hash.slice(1) === hashPath
