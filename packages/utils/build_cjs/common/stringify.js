"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parse = exports.default = void 0;

var _default = o => JSON.stringify(o);

exports.default = _default;

const parse = str => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return undefined;
  }
};

exports.parse = parse;