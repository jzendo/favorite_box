"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isInteger = _interopRequireDefault(require("@jzendo/utils/lib/common/isInteger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const genByGeneratorFunc = function* (x, returnSequence) {
  let prevs = [];
  let i = -1;

  while (++i <= x) {
    if (i <= 1) {
      if (i === 0) prevs[i] = 0;else prevs[i] = 1;
    } else {
      prevs[i] = prevs[i - 1] + prevs[i - 2];
    }

    if (returnSequence) yield prevs[i];
  }

  const lastItem = prevs[x];
  prevs = null;
  if (!returnSequence) return lastItem;
};

const parseAndReturn = iterate => {
  let r = iterate.next();
  const arr = [];

  while (!r.done) {
    arr.push(r.value);
    r = iterate.next();
  }

  if (r.value !== undefined) {
    arr.push(r.value);
  }

  return arr;
};

const fibonacci = (x, returnSequence = true) => {
  if (!(0, _isInteger.default)(x, true) || x < 0) {
    return null;
  }

  const iterate = genByGeneratorFunc(x, returnSequence);
  const arr = parseAndReturn(iterate);
  if (returnSequence) return arr;
  return arr[arr.length - 1];
};

var _default = fibonacci;
exports.default = _default;