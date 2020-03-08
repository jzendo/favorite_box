"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
const objectProtoHasOwn = Object.prototype.hasOwnProperty;

function _default(obj, p) {
  if (arguments.length < 1) {
    return objectProtoHasOwn.call();
  }

  if (!obj || p === undefined) return false;
  return objectProtoHasOwn.call(obj, p);
}