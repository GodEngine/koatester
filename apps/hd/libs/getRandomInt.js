/**
 */

module.exports = (min, max, inclusive = false) => {
  const _min = Math.ceil(min)
  const _max = Math.floor(max)

  return Math.floor(
    Math.random() * (
      inclusive ? (_max - _min + 1) : (_max - _min)
    )
  ) + _min
}
