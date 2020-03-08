import typeIs from './typeIs'

export default function (obj) {
  // Performance
  if (arguments.length === 0 || obj === undefined) return false
  return typeIs(obj, 'boolean')
}
