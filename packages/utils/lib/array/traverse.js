"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = traverse;

var _isArray = _interopRequireDefault(require("../common/isArray"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const INVALID_INDEX = -1;
const RND_DEFAULT_INDEX = INVALID_INDEX;

function traverse(arr) {
  if (!(0, _isArray.default)(arr)) {
    throw new TypeError('The parameter should be an array.');
  }

  const first = () => arr[0];

  const size = () => arr.length;

  const lastIndex = () => {
    const arrSize = size();
    if (arrSize > 0) return arrSize - 1;
    return 0;
  };

  const last = () => {
    const idx = lastIndex();
    return arr[idx];
  };

  const inArray = testItem => {
    if (testItem === undefined || size() === 0) return false;
    return arr.find(item => item === testItem) !== undefined;
  };

  const randItem = (rnd = RND_DEFAULT_INDEX) => {
    const len = size();
    if (len === 0) return undefined;
    let idx = Number(rnd);
    if (isNaN(idx)) idx = RND_DEFAULT_INDEX;

    if (idx === RND_DEFAULT_INDEX || idx < 0 || idx >= len) {
      idx = Math.floor(Math.random() * len);
    }

    return arr[idx];
  };

  const indexAt = idx => {
    return randItem(idx);
  };

  const isEmpty = () => size() === 0;

  const empty = () => {
    arr.length = 0;
  };

  const pop = () => arr.pop();

  const push = (...args) => {
    arr.push(...args);
    return size();
  };

  const popFirst = () => arr.shift();

  const pushFirst = (...args) => {
    arr.unshift(...args);
    return size();
  };

  return {
    first,
    size,
    last,
    inArray,
    randItem,
    lastIndex,
    indexAt,
    isEmpty,
    empty,
    pop,
    push,
    popFirst,
    pushFirst
  };
}