"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _invariant = _interopRequireDefault(require("../common/invariant"));

var _isNumber = _interopRequireDefault(require("../common/isNumber"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const nativeFill = Array.prototype.fill;

var _default = (times, val = '') => {
  (0, _invariant.default)(times !== undefined && (0, _isNumber.default)(times, true), 'The first parameter should be number.');
  if (times === 0) return null;
  let arr = new Array(times);

  if (nativeFill) {
    arr = arr.fill(val);
  } else {
    let i = times;

    while (i--) {
      arr[i] = val;
    }
  }

  return arr;
};

exports.default = _default;