"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function repeat(str, n = 0) {
  let result = '';

  if (n > 0) {
    switch (n) {
      case 1:
        return str;

      case 2:
        return str + str;

      case 3:
        return str + str + str;

      case 4:
        return str + str + str + str;

      case 5:
        return str + str + str + str + str;
    }

    while (true) {
      if (n & 1) result += str;
      n >>>= 1;
      if (n <= 0) break;
      str += str;
    }
  }

  return result;
}

var _default = repeat;
exports.default = _default;