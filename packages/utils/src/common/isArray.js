import isFunc from './isFunc'

export default test => {
  if (!test) return false

  if (isFunc(Array.isArray)) return Array.isArray(test)
  return typeof test === 'object' && test.constructor === Array
}
