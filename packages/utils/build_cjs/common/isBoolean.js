"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeIs = _interopRequireDefault(require("./typeIs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = obj => (0, _typeIs.default)(obj, 'boolean');

exports.default = _default;