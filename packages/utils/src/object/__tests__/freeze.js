/* global describe, test, expect */
import freeze from '../freeze'

describe('object freeze', () => {
  test('default freezen', () => {
    const a = {
      test: 1
    }
    const freezenA = freeze(a)

    expect(Object.isFrozen(a)).toBeTruthy()
    expect(freezenA).toEqual(a)

    // Can not add new property
    expect(() => {
      a.testNewProp = 123
    }).toThrow()

    // can not delete property
    expect(() => {
      delete a.test
    }).toThrow()

    // can not modify property-value
    expect(() => {
      a.test = 123
    }).toThrow()
  })

  test('shallow freezen', () => {
    const a = {
      test: 1,
      test2: {
        // can add/remove/modify object
        test2Child: 2
      }
    }
    const freezenA = freeze(a, true)

    expect(Object.isFrozen(a)).toBeTruthy()
    expect(freezenA).toEqual(a)

    // Can not add
    expect(() => {
      a.test2.testNewProp = 123
    }).not.toThrow()

    // can modify
    expect(() => {
      a.test2.testNewProp = 567
    }).not.toThrow()

    expect(a.test2.testNewProp).toEqual(567)

    // can not delete
    expect(() => {
      delete a.test2.testNewProp
    }).not.toThrow()

    expect(a.test2.testNewProp).toBeUndefined()
  })

  test('prototype property freezen', () => {
    class A {
      get test () {
        return 'test'
      }
    }

    const a = new A()
    const freezenA = freeze(a)

    expect(Object.isFrozen(a)).toBeTruthy()
    expect(freezenA).toEqual(a)

    // Can not modify prototype property which has be freezen
    expect(() => {
      // eslint-disable-next-line
      a.__proto__.test = 567
    }).toThrow()
  })
})
