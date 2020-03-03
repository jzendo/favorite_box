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

  return r && typeIs(obj, 'object')
}
