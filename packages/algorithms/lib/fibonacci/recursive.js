"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isInteger = _interopRequireDefault(require("@jzendo/utils/lib/common/isInteger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const recursive = x => {
  if (x === 0) return 0;
  if (x === 1) return 1;
  return recursive(x - 1) + recursive(x - 2);
};

const getFibonacciSequence = x => {
  let i = -1;
  const prevs = [];

  while (++i <= x) {
    if (i === 0) prevs[i] = 0;else if (i === 1) prevs[i] = 1;else {
      prevs[i] = prevs[i - 1] + prevs[i - 2];
    }
  }

  return prevs;
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