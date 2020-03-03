"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = runner;

var _defer = _interopRequireDefault(require("../common/defer"));

var _invariant = _interopRequireDefault(require("../common/invariant"));

var _isFunc = _interopRequireDefault(require("../common/isFunc"));

var _isGeneratorFunc = _interopRequireDefault(require("../common/isGeneratorFunc"));

var _isBoolean = _interopRequireDefault(require("../common/isBoolean"));

var _isPlainObject = _interopRequireDefault(require("../common/isPlainObject"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CALLBACK_GENERATOR_FN_RESULT = 'onReturnValue';

function checkArgs(generatorFunc, optional) {
  (0, _invariant.default)((0, _isGeneratorFunc.default)(generatorFunc), 'Should be a generator function.');
  (0, _invariant.default)((0, _isBoolean.default)(optional) || (0, _isPlainObject.default)(optional), 'Should be a generator function.');
}

function runner(generatorFunc, optional = true) {
  checkArgs(generatorFunc, optional);
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