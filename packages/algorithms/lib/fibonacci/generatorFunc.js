"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearCache = exports.default = void 0;

var _util = require("./util");

var _isInteger = _interopRequireDefault(require("@jzendo/utils/lib/common/isInteger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  resetCache,
  isCached,
  getCachedAt,
  getCachedCopy,
  clearCache
} = (0, _util.makeFibonacciCache)();
exports.clearCache = clearCache;
const preInitedIndex = -1;

function* cachedValues(x) {
  let i = preInitedIndex;

  while (++i <= x) {
    if (!isCached(i)) break;else {
      yield getCachedAt(i);
    }
  }

  return i - 1;
}

const calcValues = function* (x, returnSequence, i = preInitedIndex, updateAt = 1, prevs = [0, 1]) {
  function* forwardAndUpdateAt(val) {
    updateAt = (updateAt + 1) % 2;
    prevs[updateAt] = val;

    if (returnSequence) {
      yield prevs[updateAt];
    }
  }

  while (++i <= x) {
    yield* forwardAndUpdateAt(prevs[0] + prevs[1]);
  }

  if (!returnSequence) return prevs[updateAt];
};

const genIterate = function* (x, returnSequence) {
  let updateAt = 1;
  const prevs = [0, 1];
  const preOffsetIndex = yield* cachedValues(x);

  if (preOffsetIndex >= 2) {
    if (preOffsetIndex % 2 === 0) {
      prevs[0] = getCachedAt(preOffsetIndex);
      prevs[1] = getCachedAt(preOffsetIndex - 1);
      updateAt = 0;
    } else {
      prevs[0] = getCachedAt(preOffsetIndex - 1);
      prevs[1] = getCachedAt(preOffsetIndex);
      updateAt = 1;
    }
  }

  const r = yield* calcValues(x, returnSequence, preOffsetIndex, updateAt, prevs);
  return r;
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

  let arr;

  if (isCached(x)) {
    arr = getCachedCopy(x);
  } else {
    const iterate = genIterate(x, returnSequence);
    arr = parseAndReturn(iterate);
    resetCache(arr);
  }

  if (returnSequence) return arr;
  return arr[arr.length - 1];
};

var _default = fibonacci;
exports.default = _default;