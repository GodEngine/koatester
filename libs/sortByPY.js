/**
 * Filename: sortByPY.js
 * File Path: /libs/sortByPY.js
 */

const py = require('pinyin')

/**
 * Sort by PinYin
 *
 * @param {Array} list The data list will compare by PinYin
 * @param {String} key Optional, if the list is an "Array<Object>", this param specifies the key of every item
 *
 * @return {Array}
 */
module.exports = (list, key) => {
  return list.sort(key
    ? (a, b) => {
      const pyA = py(a[key])
      const pyB = py(b[key])
      return String(pyA).localeCompare(String(pyB))
    }
    : py.compare
  )
}
