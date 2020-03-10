import { makeFibonacciCache } from './util'
import isInteger from '@jzendo/utils/lib/common/isInteger'

const {
  setCachedAt,
  getCachedAt,
  isCached,
  getCachedCopy,
  clearCache
} = makeFibonacciCache()

const recursive = x => {
  if (isCached(x)) return getCachedAt(x)

  if (x === 0) return 0
  if (x === 1) return 1

  setCachedAt(x, recursive(x - 1) + recursive(x - 2))
  return getCachedAt(x)
}

// Impl A
const getFibonacciSequence = x => {
  if (isCached(x)) return getCachedCopy(x)

  let i = -1

  while (++i <= x) {
    if (!isCached(i)) {
      break
    }
  }

  if (i === x && isCached(i)) return getCachedCopy(x)

  // Opt performance
  // Skip 0 & 1
  if (i === 0) i += 2
  else if (i === 1) i += 1

  // Start from prev item of the breaked item
  i = i - 1
  while (++i <= x) {
    setCachedAt(i, getCachedAt(i - 1) + getCachedAt(i - 2))
  }

  return getCachedCopy(x)
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

  if (returnSequence) return getFibonacciSequence(x)
  return recursive(x)
}

export default fibonacci

export {
  // For unit test
  clearCache
}
