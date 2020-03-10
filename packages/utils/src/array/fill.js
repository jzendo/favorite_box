import invariant from '../common/invariant'
import isNumber from '../common/isNumber'

const nativeFill = Array.prototype.fill

/**
 * Get array which fill with the specified data
 */
export default (times, val = '') => {
  invariant(
    times !== undefined && isNumber(times, true),
    'The first parameter should be number.'
  )

  if (times === 0) return null

  let arr = new Array(times)

  if (nativeFill) {
    arr = arr.fill(val)
  } else {
    let i = times
    while (i--) {
      arr[i] = val
    }
  }

  return arr
}
