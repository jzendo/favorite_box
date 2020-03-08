"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _typeIs = _interopRequireDefault(require("./typeIs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(obj) {
  if (arguments.length === 0 || obj === undefined) return false;
  return (0, _typeIs.default)(obj, 'boolean');
}