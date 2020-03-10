import isNumber, { isFinite } from './isNumber'

// https://github.com/paulmillr/es6-shim/blob/master/es6-shim.js
const floor = val => {
  if (val === 0) return val

  return (val > 0 ? 1 : -1) * Math.floor(Math.abs(val))
}

const isSafeInteger = val =>
  Number.isSafeInteger
    ? Number.isSafeInteger(val)
    : Number.MIN_SAFE_INTEGER <= val && val <= Number.MAX_SAFE_INTEGER

export default (val, safe = false) => {
  let r

  if (Number.isInteger) {
    r = Number.isInteger(val)
  } else {
    r = isNumber(val, true)
    // Not number
    if (!r) {
      return r
    }

    // Is integer or not ?
    r = isFinite(val) && floor(val) === val
  }

  if (r && safe) return isSafeInteger(val)

  return r
}
