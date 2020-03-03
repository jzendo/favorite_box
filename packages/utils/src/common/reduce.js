import isFunc from './isFunc'
import isArray from './isArray'

const reducePolyfill = function (arr, reducer, initial) {
  const len = arr.length
  let current = 0

  if (arguments.length === 1 || !isFunc(reducer)) {
    throw new TypeError(`${String(arguments[1])} is not a function`)
  }

  // Only one arg
  if (arguments.length === 2) {
    initial = arr[0]
    current = 1
  }

  let r = initial
  for (; current < len; current++) {
    r = reducer(r, arr[current])
  }

  return r
}

let onlyOnceWarn_ = false
const hasBeenWarning = () => {
  if (onlyOnceWarn_) return true
  onlyOnceWarn_ = true
  return false
}

/**
 * Use reducer in array, `Array.prototype.reduce` polyfill
 *
 * @param {Array} array
 * @param {function} reducer
 * @param {*} initial
 * @return {*}
 */
function reduce (array, reducer, initial) {
  if (arguments.length === 0 || !isArray(array)) {
    throw new TypeError(`${String(array)} is not a array`)
  }

  const args = [...arguments]

  if (isFunc(Array.prototype?.reduce)) {
    return Array.prototype.reduce.call(...args)
  } else {
    if (process.env.NODE_ENV !== 'production' && !hasBeenWarning()) {
      console.log('Use custom reduce handler instead.')
    }
    return reducePolyfill(...args)
  }
}

export default reduce
