import isNumber from '../../common/isNumber'

// default delay, ms
const DEFAULT_DELAY_MS = 100 // ms
// 1 day, ms
const DAY_DELAY_MS = 24 * 60 * 60 * 1000 // ms

export const MAX_DELAY_MS = DAY_DELAY_MS
export const MIN_DELAY_MS = DEFAULT_DELAY_MS

const getTimeoutStatus = ms => {
  if (ms < MIN_DELAY_MS) return -1
  else if (ms > MAX_DELAY_MS) return 1
  return 0
}

export default (ms = MIN_DELAY_MS) => {
  let r = isNumber(ms, true)
  if (!r) r = MIN_DELAY_MS

  let timeout = ms
  const timeoutStatus = getTimeoutStatus(timeout)

  if (process.env.NODE_ENV === 'development' && !timeoutStatus) {
    console.log('The delay time should be a controlled.')
  }

  // Opt timeout
  if (timeoutStatus === -1) timeout = MIN_DELAY_MS
  else if (timeoutStatus === 1) timeout = MAX_DELAY_MS
  else {
  }

  return new Promise(resolve => {
    setTimeout(resolve, timeout)
  })
}
