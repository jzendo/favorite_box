"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _contant = require("./contant");

const nativeSetTimeout = window.setTimeout;
const nativeClearTimeout = window.clearTimeout;
const sessionStorage = {
  set(fn, {
    scheduledTimeouts,
    args
  }) {
    const instance = fn[_contant.storeKey];

    if (!instance) {
      fn[_contant.storeKey] = {
        current: 0,
        timer: null,
        count: scheduledTimeouts.length,
        timeouts: scheduledTimeouts,
        args
      };
    }

    return sessionStorage;
  },

  get(fn) {
    const instance = fn[_contant.storeKey];
    return instance || null;
  },

  args(fn) {
    const instance = this.get(fn);
    if (!instance) return null;
    return instance.args;
  },

  step(fn, callback) {
    const instance = sessionStorage.get(fn);

    if (!instance) {
      return callback(true);
    }

    let current;
    const {
      count,
      timeouts,
      args
    } = instance;
    current = instance.current;

    if (current <= count) {
      current = ++instance.current;
      const timeout = timeouts[current - 1];
      const timer = nativeSetTimeout(fn, timeout, ...args);
      sessionStorage.updateTimer(fn, timer);
      callback(false, timeout, args);
    } else {
      sessionStorage.clear(fn);
      callback(true);
    }
  },

  updateTimer(fn, targetTimer) {
    const instance = this.get(fn);
    if (!instance) return sessionStorage;

    if (instance.timer) {
      nativeClearTimeout(instance.timer);
    }

    if (targetTimer !== undefined) instance.timer = targetTimer;
    return sessionStorage;
  },

  clear(fn) {
    const instance = this.get(fn);
    if (!instance) return sessionStorage;
    sessionStorage.updateTimer(fn);
    if (sessionStorage.get(fn)) delete fn[_contant.storeKey];
    return sessionStorage;
  }

};
var _default = sessionStorage;
exports.default = _default;