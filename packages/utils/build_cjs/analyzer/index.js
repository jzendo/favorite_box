"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _checkIdentifier = require("./checkIdentifier");

Object.keys(_checkIdentifier).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _checkIdentifier[key];
    }
  });
});

var _checkExpression = require("./checkExpression");

Object.keys(_checkExpression).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _checkExpression[key];
    }
  });
});