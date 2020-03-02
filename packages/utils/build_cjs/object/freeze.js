"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = deepFreeze;

function deepFreeze(object, onlyShallowFreeze = false) {
  if (!onlyShallowFreeze) {
    var propNames = Object.getOwnPropertyNames(object);

    for (let name of propNames) {
      let value = object[name];

      if (value && typeof value === "object") {
        deepFreeze(value);
      }
    }
  }

  return Object.freeze(object);
}