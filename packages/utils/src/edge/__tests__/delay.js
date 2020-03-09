/* global describe, test, expect, jest */
import thousands from 'thousands'
import delay from '../delay'
import { MIN_DELAY_MS, MAX_DELAY_MS } from '../delay/promisify'

const strMax = thousands(MAX_DELAY_MS)
const strMin = thousands(MIN_DELAY_MS)

const getRndTimeout = (min = MIN_DELAY_MS, max = MAX_DELAY_MS) => {
  return Math.floor(Math.random() * (max - min) + min)
}

const runOutOfBoundTestCase = (outOfBoundTimeout, fallbackDelay) => {
  test(`with out of bound: ${thousands(
    outOfBoundTimeout
  )} ms, range: ${strMin} ms ~ ${strMax} ms`, done => {
    delay(outOfBoundTimeout).then(() => {
      expect(true).toBeTruthy()
      done()
    })

    jest.advanceTimersByTime(fallbackDelay)
  })
}

const runRandInRangeTestCase = () => {
  const inRangeTimeout = getRndTimeout()
  test(`with valid timeout: ${thousands(inRangeTimeout)} ms`, done => {
    delay(inRangeTimeout).then(() => {
      expect(true).toBeTruthy()
      done()
    })

    jest.advanceTimersByTime(inRangeTimeout)
  })
}

jest.useFakeTimers()

describe('edge/delay', () => {
  test('return promise', done => {
    const timeout = getRndTimeout()
    const result = delay(timeout)
    jest.advanceTimersByTime(timeout)
    expect(result && result.then && result.catch).toBeTruthy()
    result.then(done)
  })

  test('with no parameter', done => {
    delay().then(() => {
      expect(true).toBeTruthy()
      done()
    })
    jest.advanceTimersByTime(MIN_DELAY_MS)
  })

  // < MIN
  runOutOfBoundTestCase(MIN_DELAY_MS - getRndTimeout(10, 1000), MIN_DELAY_MS)
  // > MAX
  runOutOfBoundTestCase(MAX_DELAY_MS + getRndTimeout(1000, 10000), MAX_DELAY_MS)

  // Test rand with in-range timeout
  runRandInRangeTestCase()
  runRandInRangeTestCase()
})
