"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MAX_ALLOWED_INTEGER = void 0;

var _invariant = _interopRequireDefault(require("@jzendo/utils/lib/common/invariant"));

var _isInteger = _interopRequireDefault(require("@jzendo/utils/lib/common/isInteger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const factorial = n => {
  if (n === 0) return 1;
  if (n === 1) return 1;
  if (n === 2) return 2;
  return n * factorial(n - 1);
};

const MAX_ALLOWED_INTEGER = 50;
exports.MAX_ALLOWED_INTEGER = MAX_ALLOWED_INTEGER;

var _default = n => {
  (0, _invariant.default)((0, _isInteger.default)(n, true) && n >= 0 && n <= MAX_ALLOWED_INTEGER, 'The first parameter should be integer, not greater than %s', MAX_ALLOWED_INTEGER);
  return factorial(n);
};

exports.default = _default;