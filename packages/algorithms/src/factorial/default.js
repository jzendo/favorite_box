import invariant from '@jzendo/utils/lib/common/invariant'
import isInteger from '@jzendo/utils/lib/common/isInteger'

const factorial = n => {
  if (n === 0) return 1
  if (n === 1) return 1
  if (n === 2) return 2

  return n * factorial(n - 1)
}

export const MAX_ALLOWED_INTEGER = 50

export default n => {
  invariant(
    isInteger(n, true) && n >= 0 && n <= MAX_ALLOWED_INTEGER,
    'The first parameter should be integer, not greater than %s',
    MAX_ALLOWED_INTEGER
  )

  return factorial(n)
}
