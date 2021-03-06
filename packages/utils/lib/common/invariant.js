"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = invariant;

function invariant(condition, format, a, b, c, d, e, f) {
  if (process.env.NODE_ENV === 'production') return;

  if (arguments.length < 2) {
    throw new Error('invalid argument count.');
  }

  if (!condition) {
    const args = [a, b, c, d, e, f];
    let argIndex = 0;
    const error = new Error(format.replace(/%s/g, () => args[argIndex++]));
    error.name = 'Invariant Violation';
    throw error;
  }
}