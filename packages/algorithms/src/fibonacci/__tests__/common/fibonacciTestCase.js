/* global describe, expect, test, afterEach */
import fib10 from './fibonacci_10.json'
import fib20 from './fibonacci_20.json'
import fib50 from './fibonacci_50.json'

export default (fibonacci, clearCache, msg) => {
  function testBigNumber (msg, number, json) {
    test(`fibonacci with ${msg}`, () => {
      expect(fibonacci(number)).toEqual(json)
      expect(fibonacci(number, false)).toEqual(json[json.length - 1])
    })
  }

  describe(`algorithms/fibonacci [${msg}]`, () => {
    afterEach(() => {
      // Remove prev result, for performance test
      clearCache()
    }, 10000) // Timeout for: fib50

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
    })
    ;[
      [10, fib10],
      [20, fib20],
      [50, fib50]
    ].forEach(([number, json]) => {
      testBigNumber(`num=${number}`, number, json)
    })
  })
}
