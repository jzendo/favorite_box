"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _binarySearch = require("./binary-search");

Object.keys(_binarySearch).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _binarySearch[key];
    }
  });
});

var _fibonacci = require("./fibonacci");

Object.keys(_fibonacci).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _fibonacci[key];
    }
  });
});

var _sort = require("./sort");

Object.keys(_sort).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _sort[key];
    }
  });
});