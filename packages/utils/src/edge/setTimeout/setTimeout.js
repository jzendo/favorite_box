import invariant from '../../common/invariant'
import isFunc from '../../common/isFunc'
import isNumber from '../../common/isNumber'
import isArray from '../../common/isArray'

import { MIN_TIMEOUT_MS } from './contant'
import sessionStorage from './sessionStorage'
import getScheduledTimes from './getScheduledTimes'

const stepSetTimeoutAsync = fn => {
  sessionStorage.step(fn, isEOF => {
    if (!isEOF) stepSetTimeoutAsync(fn)
  })
}

const startSchedule = (fn, ms, args) => {
  const scheduledTimeouts = getScheduledTimes(ms)
  // Storage session data firstly
  sessionStorage.set(fn, {
    scheduledTimeouts,
    args
  })

  // Async schedule the timer.
  stepSetTimeoutAsync(fn)
}

// TODO:
//   `Timeouts in inactive tabs` -- fix it!
//   https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout#Timeouts_in_inactive_tabs_throttled_to_%E2%89%A5_1000ms
export default function setTimeout (
  fn,
  { timeout = MIN_TIMEOUT_MS, args = null }
) {
  invariant(
    arguments.length >= 1 && isFunc(fn),
    'The first parameter should be a function.'
  )

  invariant(
    isNumber(timeout, true) && /* timeout <= MAX_TIMEOUT_MS && */ timeout > 0,
    'The second parameter should be valid number when provided.'
  )

  startSchedule(fn, timeout, isArray(args) ? args : [])
}
