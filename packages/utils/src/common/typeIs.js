const toString = Object.prototype.toString

const getCamelCase = str => str.replace(/\s+(.)/g, (_, c) => c.toUpperCase())

export default function typeIs (obj, expectedType = '') {
  // Skip when no second arg or invalid
  if (arguments.length < 2 || !expectedType) return false

  const str = toString.call(obj)
  const trimedType = expectedType.trim()

  // Big camel case
  const casedType = trimedType.slice(0, 1).toUpperCase() + getCamelCase(trimedType.slice(1))

  return str === `[object ${casedType}]`
}
