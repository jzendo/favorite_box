/* global describe, test, expect */
import factorial, { MAX_ALLOWED_INTEGER } from '../default'

const normalTestCase = (n, r) => {
  test(`factorial ${n}! = ${r}`, () => {
    expect(factorial(n)).toEqual(r)
  })
}

describe('factorial/default', () => {
  test('invalid parameter', () => {
    expect(() => {
      factorial()
    }).toThrow()
    expect(() => {
      factorial(true)
    }).toThrow()
    expect(() => {
      factorial([])
    }).toThrow()
    expect(() => {
      factorial('abc')
    }).toThrow()
    expect(() => {
      factorial(1.2)
    }).toThrow()
    expect(() => {
      factorial(-100)
    }).toThrow()

    expect(() => {
      factorial(MAX_ALLOWED_INTEGER + 1)
    }).toThrow()
  })

  normalTestCase(3, 6)
  normalTestCase(5, 120)
  normalTestCase(7, 5040)
})
