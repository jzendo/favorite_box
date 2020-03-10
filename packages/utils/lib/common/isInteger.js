"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isNumber = _interopRequireWildcard(require("./isNumber"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const floor = val => {
  if (val === 0) return val;
  return (val > 0 ? 1 : -1) * Math.floor(Math.abs(val));
};

const isSafeInteger = val => Number.isSafeInteger ? Number.isSafeInteger(val) : Number.MIN_SAFE_INTEGER <= val && val <= Number.MAX_SAFE_INTEGER;

var _default = (val, safe = false) => {
  let r;

  if (Number.isInteger) {
    r = Number.isInteger(val);
  } else {
    r = (0, _isNumber.default)(val, true);

    if (!r) {
      return r;
    }

    r = (0, _isNumber.isFinite)(val) && floor(val) === val;
  }

  if (r && safe) return isSafeInteger(val);
  return r;
};

exports.default = _default;