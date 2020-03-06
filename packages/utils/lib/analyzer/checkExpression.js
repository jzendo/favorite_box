"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkExpression = checkExpression;

function checkExpression(exp) {
  try {
    new Function(`return ${exp}`);
    return true;
  } catch (e) {
    return false;
  }
}