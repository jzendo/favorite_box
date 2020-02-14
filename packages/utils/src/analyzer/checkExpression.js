export function checkExpression (exp) {
  try {
    // eslint-disable-next-line
    new Function(`return ${exp}`)
    return true
  } catch (e) {
    return false
  }
}
