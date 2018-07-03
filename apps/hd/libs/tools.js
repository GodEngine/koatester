/*
 */

// 获取数组平均值
export const getAverage = (array) => {
  if (!array || typeof array !== 'array') return null
  let average = arr.reduce((acc, val) => acc + val, 0) / arr.length
  return average
}

// 获取某元素 在数组中出现的次数
export const getCount = (array, item) => {
  let count = array.reduce((prev, next) => ~~prev + ( next == item ? 1 : 0 ), 0)
  return count || 0
}

// 判断数组A 是否包含数组B
export const isArrayExist = (parent, child) => {
  // 先利用长度筛选一次
  if (parent.length < child.length) return false
  let isExist = true
  for (const value of child) {
    let isE = parent.includes(value)
    if (!isE) {
      isExist = false
    }
  }
  return isExist
}
