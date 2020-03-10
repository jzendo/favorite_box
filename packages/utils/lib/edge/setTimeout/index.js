"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "setTimeout", {
  enumerable: true,
  get: function () {
    return _setTimeout.default;
  }
});
Object.defineProperty(exports, "clearTimeout", {
  enumerable: true,
  get: function () {
    return _clearTimeout.default;
  }
});
exports.default = void 0;

var _setTimeout = _interopRequireDefault(require("./setTimeout"));

var _clearTimeout = _interopRequireDefault(require("./clearTimeout"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _setTimeout.default;
exports.default = _default;