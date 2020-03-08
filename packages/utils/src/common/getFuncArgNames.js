import getFuncParameterNames from 'get-parameter-names'
import isFunc from './isFunc'

export default fn => {
  if (!fn || !isFunc(fn)) return null

  return getFuncParameterNames(fn)
}
