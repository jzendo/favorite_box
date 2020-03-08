/* global describe, test, expect */
import isArray from '../isArray'

describe('common/isArray', () => {
  test('should be not array', () => {
    expect(isArray()).toBeFalsy()
    expect(isArray(1)).toBeFalsy()
    expect(isArray('a')).toBeFalsy()
    expect(isArray(true)).toBeFalsy()
    expect(isArray({})).toBeFalsy()
    expect(isArray(function () {})).toBeFalsy()
  })

  test('should be array', () => {
    expect(isArray([])).toBeTruthy()
    expect(isArray([1, 3])).toBeTruthy()
    // eslint-disable-next-line no-array-constructor
    expect(isArray(new Array())).toBeTruthy()
    // eslint-disable-next-line no-array-constructor
    expect(isArray(Array())).toBeTruthy()
  })
})
