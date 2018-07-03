/**
 * Choose a random option based on a range
 * https://css-tricks.com/choose-an-random-option-based-on-a-range/
 *
 * @param  {array} choices
 *  - [[ratio, value]]
 *    e.g. [[10, 'apples'], [20, 'oranges'], [70, 'bananas']]
 * @param  {number} limit the sum value (default: 100)
 * @return {array.value}
 *
 */

const checkType = require('./checkType')

module.exports = (choices, limit = 100) => {
  if (!checkType(choices, 'Array')) {
    throw new Error('arg must be a Array.')
  }
  if (Number(choices.reduce((a, b) => a + b[0], 0)) !== limit) {
    throw new Error(`array ratio total must be ${limit}.`)
  }

  const rand = Math.floor(Math.random() * limit)

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
