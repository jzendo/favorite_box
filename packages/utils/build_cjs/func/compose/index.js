"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.composeAsync = exports.compose = exports.default = void 0;

var _strategyIterate = require("./strategyIterate");

var _composeWrapper = _interopRequireDefault(require("./composeWrapper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const compose = (0, _composeWrapper.default)(_strategyIterate.syncComposed);
exports.compose = compose;
const composeAsync = (0, _composeWrapper.default)(_strategyIterate.asyncComposed);
exports.composeAsync = composeAsync;
var _default = compose;
exports.default = _default;