import getFuncArgNames from '../common/getFuncArgNames'
import hasOwnProperty from '../common/hasOwnProp'
import isFunc from '../common/isFunc'
import stringify from '../common/stringify'

const getInitCache = () => Object.create(null)

const generateCacheUtil = () => {
  let cached = getInitCache()

  return {
    has (key) {
      if (!key || cached[key] === undefined) return false

      return hasOwnProperty(cached, key)
    },
    get (key) {
      if (this.has(key)) {
        return cached[key]
      }

      return undefined
    },
    add (key, val) {
      cached[key] = val
      return this
    },
    del (key) {
      if (this.has(key)) {
        cached[key] = undefined
      }
      return this
    },
    clear () {
      cached = getInitCache()
      return this
    }
  }
}

const genDyncFnWithOriginArgNames = (argNames, fnName) => {
  const helpArgsNames = ['fn', 'stringify', 'cacheUtil']

  const wrapFnName = `memoized${fnName.slice(0, 1).toUpperCase() +
    fnName.slice(1)}`

  const strSameAsCondition = argNames
    .map(arg => `prevArgs.${arg} === ${arg}`)
    .join(' && ')

  const strStoreArgCondition = argNames
    .map(arg => `;prevArgs.${arg} = ${arg}`)
    .join('')

  const strMap =
    '{' +
    argNames.join(': undefined, ') +
    (argNames.length ? ': undefined' : '') +
    '}'

  // eslint-disable-next-line
  return new Function(
    ...helpArgsNames,
    `
/*!
 * The function which is memoized is named '${fnName}'
 */

var disposed = false

var prev_uniqueArgKey
var prevArgs = ${strMap}

var wrapFn = function ${wrapFnName}(${argNames.join(', ')}) {
  var uniqueArgKey

  if (!disposed && prevArgs) {
    if (${strSameAsCondition}) {
      uniqueArgKey = prev_uniqueArgKey
    } else {
      uniqueArgKey = stringify(${argNames.join(', ')})
      prev_uniqueArgKey = uniqueArgKey
      ${strStoreArgCondition}
    }
  }

  if (!disposed && cacheUtil.has(uniqueArgKey)) {
    ${
      /* Only for unit/test, do not modify here!! */
      process.env.NODE_ENV === 'test'
        ? `fn.__onCacheGetter([${argNames.join(
            ', '
          )}], uniqueArgKey, cacheUtil)`
        : ''
    }

    return cacheUtil.get(uniqueArgKey)
  }${
    process.env.NODE_ENV === 'test'
      ? `else { fn.__onSkipGetter(disposed, [${argNames.join(
          ', '
        )}], uniqueArgKey, cacheUtil) }`
      : ''
  }

  var args = [${argNames.join(', ')}]
  var r = fn(${argNames.join(', ')})

  if (!disposed && r !== undefined) {
    cacheUtil.add(uniqueArgKey, r)
    ${
      process.env.NODE_ENV === 'test'
        ? `fn.__onCacheSetter(r, [${argNames.join(
            ', '
          )}], uniqueArgKey, cacheUtil)`
        : ''
    }
  }${
    process.env.NODE_ENV === 'test'
      ? `else { fn.__onSkipSetter(disposed, r, [${argNames.join(
          ', '
        )}], uniqueArgKey, cacheUtil) }`
      : ''
  }

  return r
}

wrapFn.dispose = () => {
  disposed = true
  prevArgs = null
}

return wrapFn
  `
  )
}

const keyOfMemoizedFn =
  typeof Symbol !== 'undefined'
    ? Symbol('Symbol.memoizedFunc')
    : 'Symbol.memoizedFunc'

/**
 * Get function with memoized the function's result for performance.
 *
 * @param {function} fn the function will be memoized.
 * @returns {function}
 */
export default (fn, userStringify) => {
  if (!isFunc(fn)) {
    throw new TypeError('The first parameter should be a function.')
  }
  if (fn.length === 0) {
    throw new TypeError('The function should be one parameter at least.')
  }

  let memoizedFn = fn[keyOfMemoizedFn]
  // Function name
  const fnName = fn.name || '<anonymous>'

  if (!memoizedFn) {
    const argNames = getFuncArgNames(fn)
    memoizedFn = genDyncFnWithOriginArgNames(argNames, fnName)
    fn[keyOfMemoizedFn] = memoizedFn

    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test'
    ) {
      console.log(`The memoized function: ${fnName}`)
    }
  }

  // Use user `stringify` as possible as can
  // But the default is implemented by `JSON.stringify` that is not high efficiency
  // TODO: use better `stringify` implement
  const stringifyHandler = (...args) => {
    if (userStringify) return userStringify(...args)
    return stringify(args)
  }

  return memoizedFn(fn, stringifyHandler, generateCacheUtil())
}
