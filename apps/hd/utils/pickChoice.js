/**
 * Choose a random option based on a range
 * https://css-tricks.com/choose-an-random-option-based-on-a-range/
 *
 * @param  {array} choices
 *  - [[ratio, value]]
 *    e.g. [[10, 'apples'], [20, 'oranges'], [70, 'bananas']]
 * @return {array.value}
 *
 * Created by 刘谦 <qianliu> 112486391@qq.com
 * on 2017-02-16 14:56
 */

import checkType from './checkType'

export default choices => {
  if (!checkType(choices, 'Array')) {
    throw new Error('arg must be a Array.')
  }

  if (choices.reduce((a, b) => a + b[0], 0) !== 100) {
    throw new Error('array ratio total must be 100.')
  }

  const rand = Math.floor(Math.random() * 100)

  let choiceIdx = -1
  let min
  let max

  for (let i = 0, forMax = choices.length; i < forMax; i++) {
    // set up min
    if (i === 0) {
      min = 0
    } else {
      min = 0

      // add up all the values so far
      for (let i2 = 0; i2 < i; i2++) {
        min += choices[i2][0]
      }

      // one higher
      min++
    }

    // set up max
    if (i === 0) {
      max = choices[i][0]
    } else {
      max = 0

      // add up all the values so far
      for (let i2 = 0; i2 < i + 1; i2++) {
        max += choices[i2][0]
      }
    }

    if (rand >= min && rand <= max) {
      choiceIdx = i
      break
    }
  }

  return choices[choiceIdx][1]
}
