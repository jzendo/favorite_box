"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.MIN_NUMBER = exports.MAX_NUMBER = exports.isFinite = exports.isNaN = void 0;

var _typeIs = _interopRequireDefault(require("./typeIs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isNaN = Number.isNaN || window.isNaN;
exports.isNaN = isNaN;
const isFinite = Number.isFinite || window.isFinite;
exports.isFinite = isFinite;
const MAX_NUMBER = Number.MAX_VALUE;
exports.MAX_NUMBER = MAX_NUMBER;
const MIN_NUMBER = Number.MIN_VALUE;
exports.MIN_NUMBER = MIN_NUMBER;

function _default(val, nonNaN = false) {
  if (arguments.length === 0 || val === undefined) return false;
  let r = (0, _typeIs.default)(val, 'number');
  if (!r) return r;
  if (nonNaN) r = !isNaN(val);
  r = r && isFinite(val);
  return r;
}