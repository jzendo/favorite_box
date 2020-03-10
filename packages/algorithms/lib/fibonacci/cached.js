"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isInteger = _interopRequireDefault(require("@jzendo/utils/lib/common/isInteger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cached = [0, 1];

const isCached = x => cached[x] !== undefined;

const getCachedCopy = endIndex => cached.slice(0, endIndex + 1);

const recursive = x => {
  if (isCached(x)) return cached[x];
  if (x === 0) return 0;
  if (x === 1) return 1;
  cached[x] = recursive(x - 1) + recursive(x - 2);
  return cached[x];
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
    cached[i] = cached[i - 1] + cached[i - 2];
  }

  return getCachedCopy(x);
};

const fibonacci = (x, returnSequence = true) => {
  if (!(0, _isInteger.default)(x, true) || x < 0) {
    return null;
  }

  if (returnSequence) return getFibonacciSequence(x);
  return recursive(x);
};

var _default = fibonacci;
exports.default = _default;