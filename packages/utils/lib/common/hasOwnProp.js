"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const objectProtoHasOwn = Object.prototype.hasOwnProperty;

var _default = (obj, p) => {
  if (!obj || p === undefined) return false;
  return objectProtoHasOwn.call(obj, p);
};

exports.default = _default;