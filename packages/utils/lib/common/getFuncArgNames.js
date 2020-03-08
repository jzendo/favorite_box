"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getParameterNames = _interopRequireDefault(require("get-parameter-names"));

var _isFunc = _interopRequireDefault(require("./isFunc"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = fn => {
  if (!fn || !(0, _isFunc.default)(fn)) return null;
  return (0, _getParameterNames.default)(fn);
};

exports.default = _default;