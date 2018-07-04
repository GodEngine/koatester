/*

 * @Last modified time: 2018-07-04T17:42:22+08:00
 */

module.exports = (context) => {
  if (!context) throw new Error('context must be object')

  const ipString = context.header['x-forwarded-for'] || ''
  return ipString.split(',') || []
}
