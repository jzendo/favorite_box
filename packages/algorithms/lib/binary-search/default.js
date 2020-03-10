"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = binarySearch;

var _invariant = _interopRequireDefault(require("@jzendo/utils/lib/common/invariant"));

var _isArray = _interopRequireDefault(require("@jzendo/utils/lib/common/isArray"));

var _traverse = _interopRequireDefault(require("@jzendo/utils/lib/array/traverse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const defaultCompare = (item, arrayItem) => {
  if (item === arrayItem) return 0;else if (item < arrayItem) return -1;else return 1;
};

function binarySearch(arr, item, {
  compare = defaultCompare,
  sort
} = {}) {
  (0, _invariant.default)(arguments.length >= 2, 'Two parameters at least');
  (0, _invariant.default)((0, _isArray.default)(arr) && arr.length >= 2, 'The first parameter should be array');
  (0, _invariant.default)(item !== null && item !== void 0 ? item : true, 'The second parameter should be array');
  let cloned;

  if (sort) {
    arr = sort(arr);

    if (!arr) {
      if (process.env.NODE_ENV === 'development') {
        console.log('The "sort" method should return a valid array that has been sort.');
      }

      return null;
    }

    cloned = copyArray(arr);
  } else {
    cloned = copyArray(arr);
    cloned.sort((a, b) => compare(a.value, b.value));
  }

  const dispose = () => {
    cloned = null;
  };

  let isAsc = false;
  const {
    first,
    last,
    size
  } = (0, _traverse.default)(cloned);
  const compareFirstAndLastResult = compare(first().value, last().value);

  if (compareFirstAndLastResult === 0) {
    dispose();
    return arr[0];
  }

  if (compareFirstAndLastResult === -1) {
    isAsc = true;
  } else {
    isAsc = false;
  }

  const midIndex = Math.floor(size() / 2);
  const startIndex = 0;
  const endIndex = size() - 1;
  const result = searchArray(cloned, item, {
    midIndex,
    startIndex,
    endIndex,
    isAsc,
    compare
  });
  dispose();
  if (!result) return null;
  return {
    index: result.index,
    matched: result.value
  };
}

function copyArray(arr) {
  return arr.map((itm, i) => ({
    value: itm,
    index: i
  }));
}

function searchArray(arr, item, {
  midIndex,
  startIndex,
  endIndex,
  isAsc,
  compare
}) {
  if (endIndex - startIndex <= 1) {
    if (endIndex === startIndex) {
      if (!compare(item, arr[startIndex].value)) return arr[startIndex];
      return null;
    }

    if (!compare(item, arr[startIndex].value)) return arr[startIndex];
    if (!compare(item, arr[endIndex].value)) return arr[endIndex];
    return null;
  }

  let startIndex_;
  let endIndex_;

  const getArrIndex = condition => {
    let startIndex_;
    let endIndex_;

    if (condition) {
      startIndex_ = startIndex;
      endIndex_ = midIndex;
    } else {
      startIndex_ = midIndex;
      endIndex_ = endIndex;
    }

    return [startIndex_, endIndex_];
  };

  const r = compare(item, arr[midIndex].value);
  if (r === 0) return arr[midIndex];else if (r === -1) {
    ;
    [startIndex_, endIndex_] = getArrIndex(isAsc);
  } else {
    ;
    [startIndex_, endIndex_] = getArrIndex(!isAsc);
  }
  const midIndex_ = Math.floor((endIndex_ - startIndex_ + 1) / 2) + startIndex_;
  return searchArray(arr, item, {
    midIndex: midIndex_,
    startIndex: startIndex_,
    endIndex: endIndex_,
    isAsc,
    compare
  });
}