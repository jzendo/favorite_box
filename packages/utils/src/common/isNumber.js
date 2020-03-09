import typeIs from './typeIs'

export default function (obj, nonNaN = false) {
  // Performance
  if (arguments.length === 0 || obj === undefined) return false

  const r = typeIs(obj, 'number')

  // Return when non number
  if (!r) return r

  if (nonNaN) return isNaN(obj)
  return r
}
