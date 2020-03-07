/* global describe, test, expect, beforeEach, afterEach */
import reduce from '../reduce'

const invalidArgTestCase = () => {
  describe('invalid argument', () => {
    test('call with non-array', () => {
      expect(() => {
        reduce(123, () => {})
      }).toThrow()

      expect(() => {
        reduce()
      }).toThrow()
    })
  })
}

const normalTestCase = () => {
  describe('normal', () => {
    test('call with array & reducer?', () => {
      expect(() => {
        reduce([1, 2, 3])
      }).toThrow()

      // eslint-disable-next-line
      const result = reduce([1, 2, 3], (r, c) => (r += c))
      expect(result).toEqual(6)
    })

    test('call with array & reducer & initial', () => {
      // eslint-disable-next-line
      const result = reduce([1, 2, 3], (r, c) => (r += c), 10)
      expect(result).toEqual(16)
    })
  })
}

const testCase = () => {
  invalidArgTestCase()
  normalTestCase()
}

describe('reduce', () => {
  // Native test
  describe('native', testCase)

  // Polyfill test
  describe('polyfill', () => {
    const nativeReduce = Array.prototype.reduce

    beforeEach(() => {
      // eslint-disable-next-line
      Array.prototype.reduce = undefined
    })

    afterEach(() => {
      // eslint-disable-next-line
      Array.prototype.reduce = nativeReduce
    })

    testCase()
  })
})
