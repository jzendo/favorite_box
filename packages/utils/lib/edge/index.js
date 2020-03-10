"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  delay: true
};
Object.defineProperty(exports, "delay", {
  enumerable: true,
  get: function () {
    return _delay.default;
  }
});

var _delay = _interopRequireDefault(require("./delay"));

var _setTimeout = require("./setTimeout");

Object.keys(_setTimeout).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _setTimeout[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }