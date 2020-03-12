"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearCache = exports.default = void 0;

var _util = require("./util");

var _isInteger = _interopRequireDefault(require("@jzendo/utils/lib/common/isInteger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  setCachedAt,
  getCachedAt,
  isCached,
  getCachedCopy,
  clearCache
} = (0, _util.makeFibonacciCache)();
exports.clearCache = clearCache;

const recursive = x => {
  if (isCached(x)) return getCachedAt(x);
  if (x === 0) return 0;
  if (x === 1) return 1;
  return setCachedAt(x, recursive(x - 1) + recursive(x - 2));
};

const getFibonacciSequence = x => {
  if (isCached(x)) return getCachedCopy(x);
  let i = -1;

  while (++i <= x) {
    if (!isCached(i)) {
      break;
    }
  }

  if (i === x && isCached(i)) return getCachedCopy(x);
  if (i === 0) i += 2;else if (i === 1) i += 1;
  i = i - 1;

  while (++i <= x) {
    setCachedAt(i, getCachedAt(i - 1) + getCachedAt(i - 2));
  }

  return getCachedCopy(x);
};

const fibonacci = (x, returnSequence = true) => {
  if (!(0, _isInteger.default)(x, true) || x < 0) {
    return null;
  }

  (0, _util.warnWillOutOfMemoryByFibonacci)(x);
  if (returnSequence) return getFibonacciSequence(x);
  return recursive(x);
};

var _default = fibonacci;
exports.default = _default;