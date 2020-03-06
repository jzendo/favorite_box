"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = require("../common");

var _default = (ele, value, errorHandler = _common.ctor) => {
  try {
    if (ele) {
      ele.value = value;
    }
  } catch (e) {
    errorHandler(e);
  }
};

exports.default = _default;