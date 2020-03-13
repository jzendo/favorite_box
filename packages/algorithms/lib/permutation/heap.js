"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = heap;

var _default = _interopRequireDefault(require("../factorial/default"));

var _invariant = _interopRequireDefault(require("@jzendo/utils/lib/common/invariant"));

var _isArray = _interopRequireDefault(require("@jzendo/utils/lib/common/isArray"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const swapArrayItems = (arr, indexA, indexB) => {
  ;
  [arr[indexB], arr[indexA]] = [arr[indexA], arr[indexB]];
};

const generateFactory = callback => function generate(n, arr) {
  if (n === 1) callback(arr);else {
    for (let i = 0; i < n; i++) {
      generate(n - 1, arr);

      if (n % 2 === 1) {
        swapArrayItems(arr, i, n - 1);
      } else {
        swapArrayItems(arr, 0, n - 1);
      }
    }
  }
};

const ctor = () => {};

function heap(arr, opt = {}) {
  (0, _invariant.default)((0, _isArray.default)(arr) && arr.length > 2, 'The first parameter should be array.');
  const n = arr.length;
  const {
    onValue = ctor,
    onComplete = ctor,
    onError = ctor
  } = opt;

  if (n <= 1) {
    onError(new Error('The array should be 2 items at least.'));
    return;
  }

  let currentItems = 0;
  const total = (0, _default.default)(n);
  const userCompleteSupport = onComplete !== ctor;

  const callback = val => {
    try {
      currentItems++;
      onValue(val);
    } catch (err) {}

    if (userCompleteSupport && currentItems === total) {
      onComplete();
    }
  };

  const generate = generateFactory(callback);
  generate(n, arr);
}