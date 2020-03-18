import defer from '../../common/defer'
import invariant from '../../common/invariant'
import isFunc from '../../common/isFunc'
import isGeneratorFunc from '../../common/isGeneratorFunc'
import isBoolean from '../../common/isBoolean'
import isPlainObject from '../../common/isPlainObject'

// The generator func result callback name
const CALLBACK_GENERATOR_FN_RESULT = 'onReturnValue'

// Check runner arguments
function checkArgs (generatorFunc, optional) {
  invariant(
    isGeneratorFunc(generatorFunc),
    'The first parameter should be a generator function.'
  )
  // boolean or plain object(not null)
  invariant(
    isBoolean(optional) || isPlainObject(optional),
    'The second parameter should be boolean or plain object.'
  )
}

/**
 * Run the generator function
 *
 * @param {function} generatorFuncIterable generator function
 * @param {?object|boolean} optional return promise or callback mode
 * @returns {promise|undefined}
 */
export default function runner (generatorFuncIterable, optional = true) {
  // Check arguments
  checkArgs(generatorFuncIterable, optional)

  let runnerCalledResult
  let optionalArg = optional

  // Result with promise ?
  if (optionalArg === true) {
    const { promise, resolve, reject } = defer()

    // Set `promise` as returned-value
    runnerCalledResult = promise

    optionalArg = {}
    optionalArg[CALLBACK_GENERATOR_FN_RESULT] = (err, v) => {
      if (err) reject(err)
      else resolve(v)
    }
  }

  try {
    const iterator = generatorFuncIterable()
    next(iterator, iterator.next(), optionalArg)
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.log('generatorFunctionRunner catch exception when init: ', err)
    }
    optionalArg[CALLBACK_GENERATOR_FN_RESULT](err, null)
  }

  // Undefined or promise
  return runnerCalledResult
}

function finish (opt, err, value = null) {
  const { [CALLBACK_GENERATOR_FN_RESULT]: onReturnValue } = opt
  // Return value by call func
  if (isFunc(onReturnValue)) {
    onReturnValue(err, value)
  }
}

// Iterate generator object
function next (iterator, nextGeneratorObject, opt = {}) {
  const isDone = nextGeneratorObject.done
  const value = nextGeneratorObject.value

  if (!isDone) {
    if (value instanceof Promise) {
      value
        .then(v => next(iterator, iterator.next(v), opt))
        .catch(err => {
          if (process.env.NODE_ENV === 'development') {
            console.log(
              'generatorFunctionRunner catch exception when next: ',
              err
            )
          }
          finish(opt, err, null)
        })
    } else {
      if (value !== undefined) {
        next(iterator, iterator.next(value), opt)
      } else {
        next(iterator, iterator.next(), opt)
      }
    }
  } else {
    finish(opt, null, value)
  }
}
