"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkIdentifier = checkIdentifier;
exports.checkFunctionParameter = checkFunctionParameter;

function checkIdentifier(identifier) {
  try {
    new Function(`var ${identifier}=true`);
    return true;
  } catch (e) {
    return false;
  }
}

function checkFunctionParameter(argIdentifierOrExpr) {
  try {
    new Function(argIdentifierOrExpr, '');
    return true;
  } catch (e) {
    return false;
  }
}