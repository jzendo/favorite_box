import typeIs from './typeIs'

/**
 * Chect is a plain object
 *
 * @param {object|null} obj the checking object
 * @param {boolean} shouldCheckNull should check object is `null` or not
 * @returns {boolean}
 */
export default (obj, shouldCheckNull = true) => {
  let r = true

  if (shouldCheckNull) {
    r = obj !== null
  }

  r = r && typeIs(obj, 'object')

  if (!r) return r

  // Influenced by https://github.com/reduxjs/redux/blob/3a17aef0468e279cba048411f8f91dce07c55a7e/src/utils/isPlainObject.js
  let proto = obj
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto)
  }

  return Object.getPrototypeOf(obj) === proto
}
