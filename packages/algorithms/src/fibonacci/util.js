import isArray from '@jzendo/utils/lib/common/isArray'
export const makeFibonacciCache = () => {
  // Store prev calc-data
  let cached = [0, 1]

  const isCached = x => cached[x] !== undefined
  const getCachedCopy = endIndex => cached.slice(0, endIndex + 1)

  const getCachedAt = x => cached[x]
  const setCachedAt = (x, val) => {
    cached[x] = val
    return val
  }

  const resetCache = newCached => {
    let r

    // Should be array with `first item is 0 && second item is 1`
    if (isArray(newCached) && newCached[0] === 0 && newCached[1] === 1) {
      r = newCached
    } else {
      r = [0, 1]
    }

    cached = r

    return r
  }

  const clearCache = () => {
    resetCache()
  }

  return {
    setCachedAt,
    getCachedAt,
    isCached,
    getCachedCopy,
    resetCache,
    clearCache
  }
}

// The max allowed number is for getting fibonacci sequence.
const MAX_ALLOWED_NUMBER = 10000000
export const warnWillOutOfMemoryByFibonacci = num => {
  if (num > MAX_ALLOWED_NUMBER) {
    throw new TypeError(
      `Too big number, allowing ${MAX_ALLOWED_NUMBER} at most.`
    )
  }
}
