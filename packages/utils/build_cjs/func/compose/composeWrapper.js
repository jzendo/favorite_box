"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = composeWrapper;

var _checkArgs = _interopRequireDefault(require("./checkArgs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function composeWrapper(strategyComposeFn) {
  return function composeFunc(fn1, fn2, runInReverse) {
    const originFns = [...arguments];
    (0, _checkArgs.default)(originFns);
    const fns = originFns.slice(0);
    let mayRunInReverseParam = fns[fns.length - 1];

    if (typeof mayRunInReverseParam !== 'function') {
      mayRunInReverseParam = Boolean(mayRunInReverseParam);
      fns.pop();

      if (mayRunInReverseParam) {
        fns.reverse();
      }
    }

    const composedFn = strategyComposeFn(fns);
    composedFn.args = originFns;
    return composedFn;
  };
}