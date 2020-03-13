/* global describe, test, expect, jest */
import heap from '../heap'

describe('permutation/heap', () => {
  test('invalid parameter', () => {
    expect(() => heap()).toThrow()
    expect(() => heap(1)).toThrow()
    expect(() => heap([1])).toThrow()
  })

  test('get permutation', done => {
    const fn = jest.fn()
    const totalValue = 6

    heap([1, 2, 3], {
      onValue () {
        fn()
      },
      onComplete () {
        expect(fn).toHaveBeenCalledTimes(totalValue)
        done()
      }
    })
  })
})
