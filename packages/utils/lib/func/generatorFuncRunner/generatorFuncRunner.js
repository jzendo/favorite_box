"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = runner;

var _defer = _interopRequireDefault(require("../../common/defer"));

var _invariant = _interopRequireDefault(require("../../common/invariant"));

var _isFunc = _interopRequireDefault(require("../../common/isFunc"));

var _isGeneratorFunc = _interopRequireDefault(require("../../common/isGeneratorFunc"));

var _isBoolean = _interopRequireDefault(require("../../common/isBoolean"));

var _isPlainObject = _interopRequireDefault(require("../../common/isPlainObject"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CALLBACK_GENERATOR_FN_RESULT = 'onReturnValue';

function checkArgs(generatorFunc, optional) {
  (0, _invariant.default)((0, _isGeneratorFunc.default)(generatorFunc), 'The first parameter should be a generator function.');
  (0, _invariant.default)((0, _isBoolean.default)(optional) || (0, _isPlainObject.default)(optional), 'The second parameter should be boolean or plain object.');
}

function runner(generatorFuncIterable, promisify = true) {
  checkArgs(generatorFuncIterable, promisify);
  let runnerCalledResult;
  let optionalArg = promisify;

  if (optionalArg === true) {
    const {
      promise,
      resolve,
      reject
    } = (0, _defer.default)();
    runnerCalledResult = promise;
    optionalArg = {};

    optionalArg[CALLBACK_GENERATOR_FN_RESULT] = (err, v) => {
      if (err) reject(err);else resolve(v);
    };
  }

  try {
    const iterator = generatorFuncIterable();
    next(iterator, iterator.next(), optionalArg);
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.log('generatorFunctionRunner catch exception when init: ', err);
    }

    optionalArg[CALLBACK_GENERATOR_FN_RESULT](err, null);
  }

  return runnerCalledResult;
}

function finish(opt, err, value = null) {
  const {
    [CALLBACK_GENERATOR_FN_RESULT]: onReturnValue
  } = opt;

  if ((0, _isFunc.default)(onReturnValue)) {
    onReturnValue(err, value);
  }
}

function next(iterator, nextGeneratorObject, opt = {}) {
  const isDone = nextGeneratorObject.done;
  const value = nextGeneratorObject.value;

  if (!isDone) {
    if (value instanceof Promise) {
      value.then(v => next(iterator, iterator.next(v), opt)).catch(err => {
        if (process.env.NODE_ENV === 'development') {
          console.log('generatorFunctionRunner catch exception when next: ', err);
        }

        finish(opt, err, null);
      });
    } else {
      next(iterator, iterator.next(value), opt);
    }
  } else {
    finish(opt, null, value);
  }
}