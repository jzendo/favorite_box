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
 * @param {function} generatorFunc generator function
 * @param {?object|boolean} optional return promise or callback mode
 * @returns {promise|undefined}
 */
export default function runner (generatorFunc, optional = true) {
  // Check arguments
  checkArgs(generatorFunc, optional)

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
    const iteratable = generatorFunc()
    iterateResult(iteratable)
      .then(v => {
        finish(optionalArg, null, v)
      })
      .catch(err => {
        if (process.env.NODE_ENV === 'development') {
          console.log('generatorFunctionRunner catch exception, catch: ', err)
        }
        finish(optionalArg, err, null)
      })
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.log('generatorFunctionRunner catch exception, init: ', err)
    }
    finish(optionalArg, err, null)
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

async function iterateResult (iteratable) {
  let r
  let value
  let yieldValue

  r = iteratable.next()

  while (!r.done) {
    value = r.value

    if (value instanceof Promise) {
      yieldValue = await value
    } else if (value !== undefined) {
      yieldValue = value
    } else {
      yieldValue = undefined
    }

    // Next yield
    if (yieldValue !== undefined) {
      r = iteratable.next(yieldValue)
    } else {
      r = iteratable.next()
    }
  }

  return r.value
}
