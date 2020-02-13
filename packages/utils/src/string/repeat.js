/**
 * Repeat string with n times
 *
 * @param {String} str the base string
 * @param {Integer} n repeated count
 */
function repeat (str, n = 0) {
  let result = ''
  if (n > 0) {
    if (n === 1) return str

    while (true) {
      if (n & 1) result += str
      n >>>= 1
      if (n <= 0) break
      str += str
    }
  }
  return result
}

export default repeat
