"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _invariant = _interopRequireDefault(require("../../common/invariant"));

var _isFunc = _interopRequireDefault(require("../../common/isFunc"));

var _sessionStorage = _interopRequireDefault(require("./sessionStorage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = fn => {
  (0, _invariant.default)((0, _isFunc.default)(fn), 'The first parameter should be a function.');

  _sessionStorage.default.clear(fn);
};

exports.default = _default;