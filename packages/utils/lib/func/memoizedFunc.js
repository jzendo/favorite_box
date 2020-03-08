"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getFuncArgNames = _interopRequireDefault(require("../common/getFuncArgNames"));

var _hasOwnProp = _interopRequireDefault(require("../common/hasOwnProp"));

var _isFunc = _interopRequireDefault(require("../common/isFunc"));

var _stringify = _interopRequireDefault(require("../common/stringify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getInitCache = () => Object.create(null);

const generateCacheUtil = () => {
  let cached = getInitCache();
  return {
    has(key) {
      if (!key || cached[key] === undefined) return false;
      return (0, _hasOwnProp.default)(cached, key);
    },

    get(key) {
      if (this.has(key)) {
        return cached[key];
      }

      return undefined;
    },

    add(key, val) {
      cached[key] = val;
      return this;
    },

    del(key) {
      if (this.has(key)) {
        cached[key] = undefined;
      }

      return this;
    },

    clear() {
      cached = getInitCache();
      return this;
    }

  };
};

const genDyncFnWithOriginArgNames = (argNames, fnName) => {
  const helpArgsNames = ['fn', 'stringify', 'cacheUtil'];
  const wrapFnName = `memoized${fnName.slice(0, 1).toUpperCase() + fnName.slice(1)}`;
  const strSameAsCondition = argNames.map(arg => `prevArgs.${arg} === ${arg}`).join(' && ');
  const strStoreArgCondition = argNames.map(arg => `;prevArgs.${arg} = ${arg}`).join('');
  const strMap = '{' + argNames.join(': undefined, ') + (argNames.length ? ': undefined' : '') + '}';
  return new Function(...helpArgsNames, `
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
    ${process.env.NODE_ENV === 'test' ? `fn.__onCacheGetter([${argNames.join(', ')}], uniqueArgKey, cacheUtil)` : ''}

    return cacheUtil.get(uniqueArgKey)
  }${process.env.NODE_ENV === 'test' ? `else { fn.__onSkipGetter(disposed, [${argNames.join(', ')}], uniqueArgKey, cacheUtil) }` : ''}

  var args = [${argNames.join(', ')}]
  var r = fn(${argNames.join(', ')})

  if (!disposed && r !== undefined) {
    cacheUtil.add(uniqueArgKey, r)
    ${process.env.NODE_ENV === 'test' ? `fn.__onCacheSetter(r, [${argNames.join(', ')}], uniqueArgKey, cacheUtil)` : ''}
  }${process.env.NODE_ENV === 'test' ? `else { fn.__onSkipSetter(disposed, r, [${argNames.join(', ')}], uniqueArgKey, cacheUtil) }` : ''}

  return r
}

wrapFn.dispose = () => {
  disposed = true
  prevArgs = null
}

return wrapFn
  `);
};

const keyOfMemoizedFn = typeof Symbol !== 'undefined' ? Symbol('Symbol.memoizedFunc') : 'Symbol.memoizedFunc';

var _default = (fn, userStringify) => {
  if (!(0, _isFunc.default)(fn)) {
    throw new TypeError('The first parameter should be a function.');
  }

  if (fn.length === 0) {
    throw new TypeError('The function should be one parameter at least.');
  }

  let memoizedFn = fn[keyOfMemoizedFn];
  const fnName = fn.name || '<anonymous>';

  if (!memoizedFn) {
    const argNames = (0, _getFuncArgNames.default)(fn);
    memoizedFn = genDyncFnWithOriginArgNames(argNames, fnName);
    fn[keyOfMemoizedFn] = memoizedFn;

    if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
      console.log(`The memoized function: ${fnName}`);
    }
  }

  const stringifyHandler = (...args) => {
    if (userStringify) return userStringify(...args);
    return (0, _stringify.default)(args);
  };

  return memoizedFn(fn, stringifyHandler, generateCacheUtil());
};

exports.default = _default;