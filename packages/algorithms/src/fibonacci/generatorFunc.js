import { makeFibonacciCache, warnWillOutOfMemoryByFibonacci } from './util'
import isInteger from '@jzendo/utils/lib/common/isInteger'

const {
  resetCache,
  isCached,
  getCachedAt,
  getCachedCopy,
  clearCache
} = makeFibonacciCache()

const preInitedIndex = -1

function * cachedValues (x) {
  let i = preInitedIndex
  while (++i <= x) {
    if (!isCached(i)) break
    else {
      yield getCachedAt(i)
    }
  }

  return i - 1
}

const calcValues = function * (
  x,
  returnSequence,
  i = preInitedIndex,
  updateAt = 1,
  prevs = [0, 1]
) {
  /*
  function * forwardAndUpdateAt (val) {
    updateAt = (updateAt + 1) % 2
    prevs[updateAt] = val
    if (returnSequence) {
      yield prevs[updateAt]
    }
  }

  // Case: >= 2
  while (++i <= x) {
    yield * forwardAndUpdateAt(prevs[0] + prevs[1])
  }
  */

  let val
  while (++i <= x) {
    val = prevs[0] + prevs[1]
    updateAt = (updateAt + 1) % 2
    prevs[updateAt] = val
    if (returnSequence) {
      yield prevs[updateAt]
    }
  }

  if (!returnSequence) return prevs[updateAt]
}

const genIterate = function * (x, returnSequence) {
  let updateAt = 1
  // Only two items
  const prevs = [0, 1]

  // Iterate from cached-data
  const preOffsetIndex = yield * cachedValues(x)

  // Recover prevs[0] & prevs[1] from cached data
  if (preOffsetIndex >= 2) {
    if (preOffsetIndex % 2 === 0) {
      prevs[0] = getCachedAt(preOffsetIndex)
      prevs[1] = getCachedAt(preOffsetIndex - 1)
      updateAt = 0
    } else {
      prevs[0] = getCachedAt(preOffsetIndex - 1)
      prevs[1] = getCachedAt(preOffsetIndex)
      updateAt = 1
    }
  }

  // Iterate from calced-value
  const r = yield * calcValues(
    x,
    returnSequence,
    preOffsetIndex,
    updateAt,
    prevs
  )
  return r
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

  warnWillOutOfMemoryByFibonacci(x)

  let arr

  if (isCached(x)) {
    arr = getCachedCopy(x)
  } else {
    const iterate = genIterate(x, returnSequence)
    arr = parseAndReturn(iterate)
    // Update fibonacci sequence cache
    resetCache(arr)
  }

  if (returnSequence) return arr
  return arr[arr.length - 1]
}

export default fibonacci

export {
  // For unit test
  clearCache
}
