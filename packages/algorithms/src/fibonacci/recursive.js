import isInteger from '@jzendo/utils/lib/common/isInteger'

const recursive = x => {
  if (x === 0) return 0
  if (x === 1) return 1
  return recursive(x - 1) + recursive(x - 2)
}

// By prev 1 and prev 2
const getFibonacciSequence = x => {
  let i = -1
  const prevs = []

  while (++i <= x) {
    if (i === 0) prevs[i] = 0
    else if (i === 1) prevs[i] = 1
    else {
      prevs[i] = prevs[i - 1] + prevs[i - 2]
    }
  }

  return prevs
}

/*
// By recursive
const getFibonacciSequence = x => {
  let i = -1
  const prevs = []

  while (++i <= x) {
    prevs[i] = recursive(i)
  }

  return prevs
}
*/

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

  if (returnSequence) return getFibonacciSequence(x)
  return recursive(x)
}

export default fibonacci
