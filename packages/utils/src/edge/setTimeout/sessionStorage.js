import { storeKey } from './contant'

const nativeSetTimeout = window.setTimeout
const nativeClearTimeout = window.clearTimeout

const sessionStorage = {
  set (fn, { scheduledTimeouts, args }) {
    const instance = fn[storeKey]

    if (!instance) {
      fn[storeKey] = {
        current: 0,
        timer: null,
        count: scheduledTimeouts.length,
        timeouts: scheduledTimeouts,
        args
      }
    }

    return sessionStorage
  },

  get (fn) {
    const instance = fn[storeKey]
    return instance || null
  },

  args (fn) {
    const instance = this.get(fn)
    if (!instance) return null

    return instance.args
  },

  step (fn, callback) {
    /* eslint-disable standard/no-callback-literal */
    const instance = sessionStorage.get(fn)

    if (!instance) {
      return callback(true)
    }

    let current

    const { count, timeouts, args } = instance

    current = instance.current

    // Next timer
    if (current <= count) {
      current = ++instance.current
      const timeout = timeouts[current - 1]
      const timer = nativeSetTimeout(fn, timeout, ...args)
      // Set timer
      sessionStorage.updateTimer(fn, timer)
      callback(false, timeout, args)
    } else {
      // End
      sessionStorage.clear(fn)
      callback(true)
    }
    /* eslint-enable */
  },

  updateTimer (fn, targetTimer) {
    const instance = this.get(fn)
    if (!instance) return sessionStorage

    if (instance.timer) {
      nativeClearTimeout(instance.timer)
    }

    if (targetTimer !== undefined) instance.timer = targetTimer

    return sessionStorage
  },

  clear (fn) {
    const instance = this.get(fn)
    if (!instance) return sessionStorage

    // Clear timer
    sessionStorage.updateTimer(fn)
    if (sessionStorage.get(fn)) delete fn[storeKey]
    return sessionStorage
  }
}

export default sessionStorage
