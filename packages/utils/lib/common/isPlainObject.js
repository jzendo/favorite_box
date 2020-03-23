"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeIs = _interopRequireDefault(require("./typeIs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (obj, shouldCheckNull = true) => {
  let r = true;

  if (shouldCheckNull) {
    r = obj !== null;
  }

  r = r && (0, _typeIs.default)(obj, 'object');
  if (!r) return r;
  let proto = obj;

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
};

exports.default = _default;