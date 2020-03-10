/* global describe, expect, test, beforeEach */
import fib10 from './fibonacci_10.json'
import fib20 from './fibonacci_20.json'
import fib50 from './fibonacci_50.json'

export default (fibonacci, clearCache, msg) => {
  describe(`algorithms/fibonacci [${msg}]`, () => {
    beforeEach(() => {
      // Remove prev result, for performance test
      clearCache()
    })

    test('invalid parameter', () => {
      expect(fibonacci()).toBeNull()
      expect(fibonacci(true)).toBeNull()
      expect(fibonacci(null)).toBeNull()
      expect(fibonacci('abc')).toBeNull()
      expect(fibonacci({})).toBeNull()
      expect(fibonacci(-10)).toBeNull()
    })

    test('get fibonacci, no cache', () => {
      expect(fibonacci(3, false)).toEqual(2)
    })

    test('get fibonacci sequence', () => {
      expect(fibonacci(0)).toEqual([0])
      expect(fibonacci(0, false)).toEqual(0)

      expect(fibonacci(1)).toEqual([0, 1])
      expect(fibonacci(2)).toEqual([0, 1, 1])

      expect(fibonacci(3)).toEqual([0, 1, 1, 2])
      expect(fibonacci(3, false)).toEqual(2)

      expect(fibonacci(10)).toEqual(fib10)
      expect(fibonacci(20)).toEqual(fib20)
      expect(fibonacci(50)).toEqual(fib50)

      expect(fibonacci(10, false)).toEqual(fib10[fib10.length - 1])
      expect(fibonacci(20, false)).toEqual(fib20[fib20.length - 1])
      expect(fibonacci(50, false)).toEqual(fib50[fib50.length - 1])
    })
  })
}
