"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isFunc = _interopRequireDefault(require("./isFunc"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = test => {
  if ((0, _isFunc.default)(Array.isArray)) return Array.isArray(test);
  return typeof test === 'object' && test.constructor === Array;
};

exports.default = _default;