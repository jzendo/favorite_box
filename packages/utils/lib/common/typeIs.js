"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = typeIs;
const toString = Object.prototype.toString;

const getCamelCase = str => str.replace(/\s+(.)/g, (_, c) => c.toUpperCase());

function typeIs(obj, expectedType = '') {
  if (arguments.length < 2 || !expectedType) return false;
  const str = toString.call(obj);
  const trimedType = expectedType.trim();
  const casedType = trimedType.slice(0, 1).toUpperCase() + getCamelCase(trimedType.slice(1));
  return str === `[object ${casedType}]`;
}