"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.warnWillOutOfMemoryByFibonacci = exports.makeFibonacciCache = void 0;

var _isArray = _interopRequireDefault(require("@jzendo/utils/lib/common/isArray"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const makeFibonacciCache = () => {
  let cached = [0, 1];

  const isCached = x => cached[x] !== undefined;

  const getCachedCopy = endIndex => cached.slice(0, endIndex + 1);

  const getCachedAt = x => cached[x];

  const setCachedAt = (x, val) => {
    cached[x] = val;
    return val;
  };

  const resetCache = newCached => {
    let r;

    if ((0, _isArray.default)(newCached) && newCached[0] === 0 && newCached[1] === 1) {
      r = newCached;
    } else {
      r = [0, 1];
    }

    cached = r;
    return r;
  };

  const clearCache = () => {
    resetCache();
  };

  return {
    setCachedAt,
    getCachedAt,
    isCached,
    getCachedCopy,
    resetCache,
    clearCache
  };
};

exports.makeFibonacciCache = makeFibonacciCache;
const MAX_ALLOWED_NUMBER = 10000000;

const warnWillOutOfMemoryByFibonacci = num => {
  if (num > MAX_ALLOWED_NUMBER) {
    throw new TypeError(`Too big number, allowing ${MAX_ALLOWED_NUMBER} at most.`);
  }
};

exports.warnWillOutOfMemoryByFibonacci = warnWillOutOfMemoryByFibonacci;