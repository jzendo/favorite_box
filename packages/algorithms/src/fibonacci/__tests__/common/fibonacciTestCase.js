/* global describe, expect, test */

export default fibonacci => {
  describe('algorithms/fibonacci', () => {
    test('invalid parameter', () => {
      expect(fibonacci()).toBeNull()
      expect(fibonacci(true)).toBeNull()
      expect(fibonacci(null)).toBeNull()
      expect(fibonacci('abc')).toBeNull()
      expect(fibonacci({})).toBeNull()
      expect(fibonacci(-10)).toBeNull()
    })

    test('get fibonacci sequence', () => {
      expect(fibonacci(0)).toEqual([0])
      expect(fibonacci(0, false)).toEqual(0)

      expect(fibonacci(1)).toEqual([0, 1])
      expect(fibonacci(2)).toEqual([0, 1, 1])

      expect(fibonacci(3)).toEqual([0, 1, 1, 2])
      expect(fibonacci(3, false)).toEqual(2)

      expect(fibonacci(10)).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55])
      expect(fibonacci(10, false)).toEqual(55)
    })
  })
}
