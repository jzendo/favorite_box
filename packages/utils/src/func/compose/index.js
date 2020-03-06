import isFunc from '../../common/isFunc'
import { asyncComposed, syncComposed } from './strategyIterate'

const checkArgs = args => {
  const argCount = args.length

  if (argCount < 2) {
    throw new TypeError('The passed arguments should be two at least.')
  }

  for (let i = 0; i < argCount - 1; i++) {
    if (!isFunc(args[i])) {
      if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
        console.log(`Expect a function, but actual type=${typeof args[i]}, toString=${String(args[i])}.`)
      }

      throw new TypeError(`The ${i + 1}th arg should be a function.`)
    }
  }

  // Should all function when only two arguments
  if (argCount === 2 && !isFunc(args[argCount - 1])) {
    throw new TypeError('All should be functions when only two args.')
  }
}

const withStrategy = strategyComposeFn =>
  function composeFunc (fn1, fn2/* , fn3, ... */, /* fn(N) || runInReverse */ runInReverse) {
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

/**
 * Generate the sync composed function
 *
 * @param {function} fn1 function to be composed
 * @param {?boolean} mayRunInReverseParam reverse or not
 * @returns {function} composed function
 */
const compose = withStrategy(syncComposed)

/**
 * Generate the async composed function
 *
 * @param {function} fn1 function to be composed
 * @param {?boolean} mayRunInReverseParam reverse or not
 * @returns {function} composed function
 */
const composeAsync = withStrategy(asyncComposed)

export default compose

export { compose, composeAsync }
