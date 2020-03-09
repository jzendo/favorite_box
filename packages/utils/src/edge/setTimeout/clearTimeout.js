import invariant from '../../common/invariant'
import isFunc from '../../common/isFunc'
import sessionStorage from './sessionStorage'

export default fn => {
  invariant(
    isFunc(fn),
    'The first parameter should be a function.'
  )

  sessionStorage.clear(fn)
}
