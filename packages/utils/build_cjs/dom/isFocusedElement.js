"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = ele => {
  try {
    return ele && document.activeElement === ele;
  } catch (e) {
    return false;
  }
};

exports.default = _default;