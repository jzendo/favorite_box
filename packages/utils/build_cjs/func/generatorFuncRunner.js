"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = runner;

var _isFunc = _interopRequireDefault(require("../common/isFunc"));

var _defer = _interopRequireDefault(require("../common/defer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CALLBACK_GENERATOR_FN_RESULT = 'onReturnValue';

function runner(generatorFunc, optional = true) {
  let runnerCalledResult;
  let optionalArg = optional;

  if (optionalArg === true) {
    const {
      promise,
      resolve
    } = (0, _defer.default)();
    runnerCalledResult = promise;
    optionalArg = {};

    optionalArg[CALLBACK_GENERATOR_FN_RESULT] = v => {
      resolve(v);
    };
  }

  const iterator = generatorFunc();
  next(iterator, iterator.next(), optionalArg);
  return runnerCalledResult;
}

function next(iterator, nextGeneratorObject, opt) {
  const isDone = nextGeneratorObject.done;
  const value = nextGeneratorObject.value;

  if (!isDone) {
    if (value instanceof Promise) {
      value.then(v => {
        next(iterator, iterator.next(v), opt);
      });
    } else {
      if (value !== undefined) {
        next(iterator, iterator.next(value), opt);
      } else {
        next(iterator, iterator.next(), opt);
      }
    }
  } else {
    if (opt) {
      const {
        [CALLBACK_GENERATOR_FN_RESULT]: onReturnValue
      } = opt || {};

      if ((0, _isFunc.default)(onReturnValue)) {
        onReturnValue(value);
      }
    }
  }
}