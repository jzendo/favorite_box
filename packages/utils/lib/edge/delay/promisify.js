"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MIN_DELAY_MS = exports.MAX_DELAY_MS = void 0;

var _isNumber = _interopRequireDefault(require("../../common/isNumber"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DEFAULT_DELAY_MS = 100;
const DAY_DELAY_MS = 24 * 60 * 60 * 1000;
const MAX_DELAY_MS = DAY_DELAY_MS;
exports.MAX_DELAY_MS = MAX_DELAY_MS;
const MIN_DELAY_MS = DEFAULT_DELAY_MS;
exports.MIN_DELAY_MS = MIN_DELAY_MS;

const getTimeoutStatus = ms => {
  if (ms < MIN_DELAY_MS) return -1;else if (ms > MAX_DELAY_MS) return 1;
  return 0;
};

var _default = (ms = MIN_DELAY_MS) => {
  let r = (0, _isNumber.default)(ms, true);
  if (!r) r = MIN_DELAY_MS;
  let timeout = ms;
  const timeoutStatus = getTimeoutStatus(timeout);

  if (process.env.NODE_ENV === 'development' && !timeoutStatus) {
    console.log('The delay time should be a controlled.');
  }

  if (timeoutStatus === -1) timeout = MIN_DELAY_MS;else if (timeoutStatus === 1) timeout = MAX_DELAY_MS;else {}
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

exports.default = _default;