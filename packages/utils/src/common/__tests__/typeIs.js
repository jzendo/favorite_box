/* global describe, test, expect */
import typeIs from '../typeIs'

describe('common/typeIs', () => {
  test('invalid parameters', () => {
    expect(typeIs()).toBeFalsy()
    expect(typeIs(1)).toBeFalsy()
    expect(typeIs('a')).toBeFalsy()
    expect(typeIs(true)).toBeFalsy()
    expect(typeIs({})).toBeFalsy()
  })

  test('should be ok', () => {
    expect(typeIs(1, 'number')).toBeTruthy()
    expect(typeIs('1', 'string')).toBeTruthy()
    expect(typeIs(true, 'boolean')).toBeTruthy()
    expect(typeIs(function * () {}, 'generator function')).toBeTruthy()

    // Array, but not object
    const testArray = []
    expect(typeIs(testArray, 'array')).toBeTruthy()
    expect(typeIs(testArray, 'Array')).toBeTruthy()
    expect(typeIs(testArray, 'object')).toBeFalsy()
  })
})
