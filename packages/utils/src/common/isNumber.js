import typeIs from './typeIs'

export const isNaN = Number.isNaN || window.isNaN

export const isFinite = Number.isFinite || window.isFinite
export const MAX_NUMBER = Number.MAX_VALUE
export const MIN_NUMBER = Number.MIN_VALUE

export default function (val, nonNaN = false) {
  // Performance
  if (arguments.length === 0 || val === undefined) return false

  let r = typeIs(val, 'number')

  // Return when non number
  if (!r) return r

  if (nonNaN) r = !isNaN(val)

  // Check valid number
  r = r && isFinite(val)

  return r
}
