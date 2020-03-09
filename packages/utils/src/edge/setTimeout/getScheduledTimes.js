import arrayFill from '../../array/fill'
import {
  MIN_TIMEOUT_MS
  // MAX_TIMEOUT_MS
} from './contant'

const getTimeouts = (base, times, remain = 0) => {
  const r = arrayFill(times, base)

  if (!r) return [MIN_TIMEOUT_MS]

  if (remain > 0) r.push(remain)
  return r
}

const getTimeoutsByHour = ms => {
  const hours = Math.floor(ms / HOUR_MS)
  const remains = ms - HOUR_MS * hours
  return getTimeouts(hours, HOUR_MS, remains)
}

// 1 hour, ms
const HOUR_MS = 60 * 60 * 1000

// 1/2 day, ms
const HALF_DAY_MS = 12 * HOUR_MS

// 1 day, ms
const DAY_MS = 2 * HALF_DAY_MS

const scheduledTimeouts = [
  [
    HOUR_MS,
    ms => {
      return [ms]
    }
  ],
  [HALF_DAY_MS, getTimeoutsByHour],
  [DAY_MS, getTimeoutsByHour]
]

const scheduledOtherTimeouts = ms => {
  /*
  // Ensure max ms
  if (ms > MAX_TIMEOUT_MS) {
    ms = MAX_TIMEOUT_MS
  }
  */

  // Split by `half of day`
  const halfDays = Math.floor(ms / HALF_DAY_MS)
  const remains = ms - HALF_DAY_MS * halfDays
  return getTimeouts(halfDays, HALF_DAY_MS, remains)
}

export default function getScheduledTimes (ms) {
  let scheduledTimes

  // Matching the pre-configuration firstly
  scheduledTimeouts.some(([condition, getter]) => {
    if (ms <= condition) {
      scheduledTimes = getter(ms)
      return true
    }
  })

  // Than fallback
  if (!scheduledTimes) {
    scheduledTimes = scheduledOtherTimeouts(ms)
  }

  return scheduledOtherTimeouts || []
}
