"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isFunc = _interopRequireDefault(require("./isFunc"));

var _isArray = _interopRequireDefault(require("./isArray"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const reducePolyfill = function (arr, reducer, initial) {
  const len = arr.length;
  let current = 0;

  if (arguments.length === 1 || !(0, _isFunc.default)(reducer)) {
    throw new TypeError(`${String(arguments[1])} is not a function`);
  }

  if (arguments.length === 2) {
    initial = arr[0];
    current = 1;
  }

  let r = initial;

  for (; current < len; current++) {
    r = reducer(r, arr[current]);
  }

  return r;
};

let onlyOnceWarn_ = false;

const hasBeenWarning = () => {
  if (onlyOnceWarn_) return true;
  onlyOnceWarn_ = true;
  return false;
};

function reduce(array, reducer, initial) {
  var _Array$prototype;

  if (arguments.length === 0 || !(0, _isArray.default)(array)) {
    throw new TypeError(`${String(array)} is not a array`);
  }

  const args = [...arguments];

  if ((0, _isFunc.default)((_Array$prototype = Array.prototype) === null || _Array$prototype === void 0 ? void 0 : _Array$prototype.reduce)) {
    return Array.prototype.reduce.call(...args);
  } else {
    if (process.env.NODE_ENV !== 'production' && !hasBeenWarning()) {
      console.log('Use custom reduce handler instead.');
    }

    return reducePolyfill(...args);
  }
}

var _default = reduce;
exports.default = _default;