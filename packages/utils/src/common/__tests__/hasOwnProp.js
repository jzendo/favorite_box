/* global describe, test, expect */
import hasOwnProp from '../hasOwnProp'

describe('common/hasOwnProp', () => {
  test('invalid', () => {
    expect(() => hasOwnProp()).toThrow(
      /Cannot convert undefined or null to object/
    )
    expect(hasOwnProp(1)).toBeFalsy()
    expect(hasOwnProp('a')).toBeFalsy()
    expect(hasOwnProp(true)).toBeFalsy()
    expect(hasOwnProp([])).toBeFalsy()

    expect(hasOwnProp(1, 'toString')).toBeFalsy()
    expect(hasOwnProp('a', 'toString')).toBeFalsy()
    expect(hasOwnProp(true, 'toString')).toBeFalsy()
    expect(hasOwnProp([], 'toString')).toBeFalsy()
  })

  test('should has not the property', () => {
    const testObj = { a: 1 }
    expect(hasOwnProp(testObj, 'toString')).toBeFalsy()
    expect(hasOwnProp(testObj, '__proto__')).toBeFalsy()
    expect(hasOwnProp(testObj, 'constructor')).toBeFalsy()
  })

  test('should has the property', () => {
    const testObj = { a: 1 }
    expect(hasOwnProp(testObj, 'a')).toBeTruthy()
  })
})
