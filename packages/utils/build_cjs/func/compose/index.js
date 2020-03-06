"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.composeAsync = exports.compose = exports.default = void 0;

var _isFunc = _interopRequireDefault(require("../../common/isFunc"));

var _strategyIterate = require("./strategyIterate");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const checkArgs = args => {
  const argCount = args.length;

  if (argCount < 2) {
    throw new TypeError('The passed arguments should be two at least.');
  }

  for (let i = 0; i < argCount - 1; i++) {
    if (!(0, _isFunc.default)(args[i])) {
      if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
        console.log(`Expect a function, but actual type=${typeof args[i]}, toString=${String(args[i])}.`);
      }

      throw new TypeError(`The ${i + 1}th arg should be a function.`);
    }
  }

  if (argCount === 2 && !(0, _isFunc.default)(args[argCount - 1])) {
    throw new TypeError('All should be functions when only two args.');
  }
};

const withStrategy = strategyComposeFn => function composeFunc(fn1, fn2, runInReverse) {
  const originFns = [...arguments];
  checkArgs(originFns);
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

const compose = withStrategy(_strategyIterate.syncComposed);
exports.compose = compose;
const composeAsync = withStrategy(_strategyIterate.asyncComposed);
exports.composeAsync = composeAsync;
var _default = compose;
exports.default = _default;