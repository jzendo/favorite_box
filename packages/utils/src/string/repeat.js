/**
 * Repeat string with n times
 *
 * @param {String} str the base string
 * @param {Integer} n repeated count
 */
function repeat (str, n = 0) {
  let result = ''
  if (n > 0) {
    // Opt for small integer
    switch (n) {
      case 1:
        return str
      case 2:
        return str + str
      case 3:
        return str + str + str
      case 4:
        return str + str + str + str
      case 5:
        return str + str + str + str + str
    }

    while (true) {
      // TODO: should use array/join instead[IE <= 10]
      if (n & 1) result += str
      n >>>= 1
      if (n <= 0) break
      str += str
    }
  }
  return result
}

export default repeat
