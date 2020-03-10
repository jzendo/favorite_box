/*
 * @jest-envoriment jsdom
 */

/* global describe, expect, test, beforeEach, afterEach */
import isNumber, { MAX_NUMBER, MIN_NUMBER } from '../isNumber'

const ctor = () => {}

const getMaxNumberPlaces = () => {
  const strMaxNumber = Number.MAX_VALUE.toPrecision()
  const r = strMaxNumber.match(/e\+(\d+)/)

  return r && Number(r[1]) + 2
}

const getOutOfBoundVals = () => {
  const places = getMaxNumberPlaces()
  let digits = new Array(places).fill('1')
  let num

  try {
    num = Number(digits.join(''))
    return [-1 * num, num]
  } finally {
    digits = null
    num = null
  }
}

const testCase = (msg, { before = ctor, after = ctor } = {}) => {
  describe(msg, () => {
    if (before !== ctor) beforeEach(before)
    if (after !== ctor) afterEach(after)

    test('illegal', () => {
      // Not number
      expect(isNumber()).toBeFalsy()
      expect(isNumber(null)).toBeFalsy()
      expect(isNumber(true)).toBeFalsy()
      expect(isNumber('1')).toBeFalsy()
      expect(isNumber('abc')).toBeFalsy()
      expect(isNumber({})).toBeFalsy()
      expect(isNumber(function () {})).toBeFalsy()

      // NaN, check non-NaN
      expect(isNumber(NaN, true)).toBeFalsy()

      expect(isNumber(Infinity)).toBeFalsy()
      expect(isNumber(-Infinity)).toBeFalsy()

      // Out of bound
      const [minOutOfBound, maxOutOfBound] = getOutOfBoundVals()
      expect(isNumber(minOutOfBound)).toBeFalsy()
      expect(isNumber(maxOutOfBound)).toBeFalsy()
    })

    test('legal with', () => {
      expect(isNumber(NaN)).toBeFalsy()
      expect(isNumber(0)).toBeTruthy()
      expect(isNumber(0, true)).toBeTruthy()
      expect(isNumber(1.0)).toBeTruthy()
      expect(isNumber(-1)).toBeTruthy()
      expect(isNumber(1)).toBeTruthy()
      expect(isNumber(1.123)).toBeTruthy()
      expect(isNumber(-1.123)).toBeTruthy()
      expect(isNumber(2e8)).toBeTruthy()
      expect(isNumber(2e-8)).toBeTruthy()

      expect(isNumber(MAX_NUMBER)).toBeTruthy()
      expect(isNumber(MAX_NUMBER)).toBeTruthy()
      expect(isNumber(MAX_NUMBER, true)).toBeTruthy()
      expect(isNumber(MAX_NUMBER, true)).toBeTruthy()

      expect(isNumber(MIN_NUMBER)).toBeTruthy()
      expect(isNumber(MIN_NUMBER)).toBeTruthy()
      expect(isNumber(MIN_NUMBER, true)).toBeTruthy()
      expect(isNumber(MIN_NUMBER, true)).toBeTruthy()
    })
  })
}

testCase('common/isNumber')
