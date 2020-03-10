"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storeKey = exports.symbolLabel = exports.MIN_TIMEOUT_MS = exports.MAX_TIMEOUT_MS = void 0;
const MAX_TIMEOUT_MS = 2147483648;
exports.MAX_TIMEOUT_MS = MAX_TIMEOUT_MS;
const MIN_TIMEOUT_MS = 4;
exports.MIN_TIMEOUT_MS = MIN_TIMEOUT_MS;
const symbolLabel = '@@customeSetTimeout';
exports.symbolLabel = symbolLabel;
const storeKey = typeof Symbol === 'undefined' ? Symbol(symbolLabel) : symbolLabel;
exports.storeKey = storeKey;