import checkArgs from './checkArgs'

/**
 * Get composed function
 *
 * @param {function} strategyComposeFn strategy-composed function
 * @returns {function}
 */
export default function composeWrapper (strategyComposeFn) {
  return function composeFunc (fn1, fn2/* , fn3, ... */, /* fn(N) || runInReverse */ runInReverse) {
    const originFns = [...arguments]

    // All should be function, excluding the last one
    checkArgs(originFns)

    const fns = originFns.slice(0)
    let mayRunInReverseParam = fns[fns.length - 1]

    if (typeof mayRunInReverseParam !== 'function') {
      mayRunInReverseParam = Boolean(mayRunInReverseParam)
      // Exclude the last parameter
      fns.pop()

      // Reverse fns
      if (mayRunInReverseParam) {
        fns.reverse()
      }
    }

    const composedFn = strategyComposeFn(fns)
    // Store origin arguments
    composedFn.args = originFns

    return composedFn
  }
}
