import isInteger from '@jzendo/utils/lib/common/isInteger'

const genByGeneratorFunc = function * (x, returnSequence) {
  let prevs = []
  let i = -1

  while (++i <= x) {
    if (i <= 1) {
      // 0
      if (i === 0) prevs[i] = 0
      // 1
      else prevs[i] = 1
    } else {
      prevs[i] = prevs[i - 1] + prevs[i - 2]
    }

    if (returnSequence) yield prevs[i]
  }

  const lastItem = prevs[x]

  prevs = null

  if (!returnSequence) return lastItem
}

const parseAndReturn = iterate => {
  let r = iterate.next()
  const arr = []

  while (!r.done) {
    arr.push(r.value)
    r = iterate.next()
  }

  if (r.value !== undefined) {
    arr.push(r.value)
  }

  return arr
}

/**
 * Get `Fibonacci Sequence` or `Fibonacci Number`.
 *
 * @param {Integer} x  ensure `x >= 0`
 * @param {Boolean} returnSequence  return sequence or not
 * @returns {Integer|Array<integer>}
 */
const fibonacci = (x, returnSequence = true) => {
  if (!isInteger(x, true) || x < 0) {
    return null
  }

  const iterate = genByGeneratorFunc(x, returnSequence)
  const arr = parseAndReturn(iterate)
  if (returnSequence) return arr
  return arr[arr.length - 1]
}

export default fibonacci
