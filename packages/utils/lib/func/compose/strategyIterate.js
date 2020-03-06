"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.syncComposed = exports.asyncComposed = void 0;

var _reduce = _interopRequireDefault(require("../../common/reduce"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const asyncComposed = fns => {
  const len = fns.length;

  const next = (r, current, callback) => {
    let strategyNext;

    if (current < len - 1) {
      strategyNext = r => {
        next(r, current + 1, callback);
      };
    } else {
      strategyNext = r => {
        callback(r);
      };
    }

    fns[current](r, strategyNext);
  };

  return (initedValue, callback) => {
    next(initedValue, 0, callback);
  };
};

exports.asyncComposed = asyncComposed;

const reducer = (prev, fn) => (...args) => fn(prev(...args));

const syncComposed = fns => (0, _reduce.default)(fns, reducer);

exports.syncComposed = syncComposed;