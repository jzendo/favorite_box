"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getScheduledTimes;

var _fill = _interopRequireDefault(require("../../array/fill"));

var _contant = require("./contant");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getTimeouts = (base, times, remain = 0) => {
  const r = (0, _fill.default)(times, base);
  if (!r) return [_contant.MIN_TIMEOUT_MS];
  if (remain > 0) r.push(remain);
  return r;
};

const getTimeoutsByHour = ms => {
  const hours = Math.floor(ms / HOUR_MS);
  const remains = ms - HOUR_MS * hours;
  return getTimeouts(hours, HOUR_MS, remains);
};

const HOUR_MS = 60 * 60 * 1000;
const HALF_DAY_MS = 12 * HOUR_MS;
const DAY_MS = 2 * HALF_DAY_MS;
const scheduledTimeouts = [[HOUR_MS, ms => {
  return [ms];
}], [HALF_DAY_MS, getTimeoutsByHour], [DAY_MS, getTimeoutsByHour]];

const scheduledOtherTimeouts = ms => {
  const halfDays = Math.floor(ms / HALF_DAY_MS);
  const remains = ms - HALF_DAY_MS * halfDays;
  return getTimeouts(halfDays, HALF_DAY_MS, remains);
};

function getScheduledTimes(ms) {
  let scheduledTimes;
  scheduledTimeouts.some(([condition, getter]) => {
    if (ms <= condition) {
      scheduledTimes = getter(ms);
      return true;
    }
  });

  if (!scheduledTimes) {
    scheduledTimes = scheduledOtherTimeouts(ms);
  }

  return scheduledOtherTimeouts || [];
}