"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = binarySort;

var _invariant = _interopRequireDefault(require("@jzendo/utils/lib/common/invariant"));

var _isArray = _interopRequireDefault(require("@jzendo/utils/lib/common/isArray"));

var _traverse = _interopRequireDefault(require("@jzendo/utils/lib/array/traverse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function binarySort(arr, isAsc = true) {
  (0, _invariant.default)(arguments.length >= 1, 'One parameter(s) at least');
  (0, _invariant.default)((0, _isArray.default)(arr), 'The first parameter should be array');
  if (arr.length <= 1) return arr;
  const sortedArray = sortArray(arr);
  return isAsc ? sortedArray : sortedArray.reverse();
}

function sortArray(arr) {
  const {
    indexAt,
    size
  } = (0, _traverse.default)(arr);
  const count = size();
  if (count <= 0) return [];
  if (count <= 1) return arr;

  if (count === 2) {
    if (arr[0] > arr[1]) return arr.reverse();
    return arr;
  }

  const midIndex = Math.floor(count / 2);
  const left = [];
  const right = [];
  const middle = [];
  const midRefer = arr[midIndex];
  let itm;
  let i = -1;

  while (++i < size()) {
    itm = indexAt(i);

    if (itm === midRefer) {
      middle.push(itm);
    } else if (itm < midRefer) {
      left.push(itm);
    } else {
      right.push(itm);
    }
  }

  const r = [...sortArray(left), ...middle, ...sortArray(right)];
  return r;
}