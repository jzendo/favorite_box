"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setTimeout;

var _invariant = _interopRequireDefault(require("../../common/invariant"));

var _isFunc = _interopRequireDefault(require("../../common/isFunc"));

var _isNumber = _interopRequireDefault(require("../../common/isNumber"));

var _isArray = _interopRequireDefault(require("../../common/isArray"));

var _contant = require("./contant");

var _sessionStorage = _interopRequireDefault(require("./sessionStorage"));

var _getScheduledTimes = _interopRequireDefault(require("./getScheduledTimes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const stepSetTimeoutAsync = fn => {
  _sessionStorage.default.step(fn, isEOF => {
    if (!isEOF) stepSetTimeoutAsync(fn);
  });
};

const startSchedule = (fn, ms, args) => {
  const scheduledTimeouts = (0, _getScheduledTimes.default)(ms);

  _sessionStorage.default.set(fn, {
    scheduledTimeouts,
    args
  });

  stepSetTimeoutAsync(fn);
};

function setTimeout(fn, {
  timeout = _contant.MIN_TIMEOUT_MS,
  args = null
}) {
  (0, _invariant.default)(arguments.length >= 1 && (0, _isFunc.default)(fn), 'The first parameter should be a function.');
  (0, _invariant.default)((0, _isNumber.default)(timeout, true) && timeout > 0, 'The second parameter should be valid number when provided.');
  startSchedule(fn, timeout, (0, _isArray.default)(args) ? args : []);
}