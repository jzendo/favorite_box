import { ctor } from '../common'

export default (ele, value, errorHandler = ctor) => {
  // some property updates can throw
  // e.g. `value` on <progress> w/ non-finite value
  try {
    if (ele) {
      ele.value = value
    }
  } catch (e) {
    errorHandler(e)
  }
}
