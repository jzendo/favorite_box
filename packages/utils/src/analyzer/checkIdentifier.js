
export function checkIdentifier (identifier) {
  try {
    // eslint-disable-next-line
    new Function(`var ${identifier}=true`)
    return true
  } catch (e) {
    return false
  }
}

export function checkFunctionParameter (argIdentifierOrExpr) {
  try {
    // eslint-disable-next-line
    new Function(argIdentifierOrExpr, '')
    return true
  } catch (e) {
    return false
  }
}
