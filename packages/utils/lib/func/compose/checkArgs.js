"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = checkArgs;

var _isFunc = _interopRequireDefault(require("../../common/isFunc"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function checkArgs(args) {
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
}