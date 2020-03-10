/*
 * @jest-envoriment jsdom
 */

/* global describe, expect, test, beforeEach, afterEach */
import isInteger from '../isInteger'

const ctor = () => {}

const testCase = (msg, { before = ctor, after = ctor } = {}) => {
  describe(msg, () => {
    if (before !== ctor) beforeEach(before)
    if (after !== ctor) afterEach(after)

    test('illegal', () => {
      // Not number
      expect(isInteger()).toBeFalsy()
      expect(isInteger(null)).toBeFalsy()
      expect(isInteger(true)).toBeFalsy()
      expect(isInteger('1')).toBeFalsy()
      expect(isInteger('abc')).toBeFalsy()
      expect(isInteger({})).toBeFalsy()
      expect(isInteger(function () {})).toBeFalsy()

      // Number, not integer
      expect(isInteger(-1.0001)).toBeFalsy()
      expect(isInteger(1.0001)).toBeFalsy()
      // Integer, not safe integer
      expect(isInteger(Number.MAX_SAFE_INTEGER + 1, true)).toBeFalsy()
    })

    test('legal with', () => {
      expect(isInteger(0)).toBeTruthy()
      expect(isInteger(1.0)).toBeTruthy()
      expect(isInteger(-1)).toBeTruthy()
      expect(isInteger(1)).toBeTruthy()
      expect(isInteger(2e8)).toBeTruthy()

      // Integer
      expect(isInteger(Number.MAX_SAFE_INTEGER + 1)).toBeTruthy()
      expect(isInteger(Number.MAX_SAFE_INTEGER - 1, true)).toBeTruthy()
    })
  })
}

const withoutNativeIsIntegerTestCase = () => {
  const nativeIsInteger = Number.isInteger

  testCase('disable native Number.isInteger', {
    before () {
      Number.isInteger = undefined
    },
    after () {
      Number.isInteger = nativeIsInteger
    }
  })
}

const withoutNativeIsSafeIntegerTestCase = () => {
  const nativeIsInteger = Number.isSafeInteger

  testCase('disable native Number.isSafeInteger', {
    before () {
      Number.isSafeInteger = undefined
    },
    after () {
      Number.isSafeInteger = nativeIsInteger
    }
  })
}

describe('common/isInteger', () => {
  testCase('native Number.isInteger')
  withoutNativeIsIntegerTestCase()
  withoutNativeIsSafeIntegerTestCase()
})
