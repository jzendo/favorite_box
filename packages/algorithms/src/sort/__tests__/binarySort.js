/* global describe, expect, test */
import binarySort from '../binarySort'

import ascData from './common/asc.json'
import descData from './common/desc.json'
import randData from './common/rand.json'

const expectThrow = fn => {
  expect(fn).toThrow()
}

describe('sort/binarySort', () => {
  test('invalid parameters', () => {
    expectThrow(() => {
      binarySort()
    })
    expectThrow(() => {
      binarySort(1)
    })
    expectThrow(() => {
      binarySort('abc')
    })
    expectThrow(() => {
      binarySort(true)
    })
    expectThrow(() => {
      binarySort({})
    })
    expectThrow(() => {
      binarySort(function () {})
    })
  })

  test('binary sort', () => {
    expect(binarySort([])).toEqual([])
    expect(binarySort([1])).toEqual([1])
    expect(binarySort([2, 1])).toEqual([1, 2])
    expect(binarySort([2, 1, 2, 3, 6, 5])).toEqual([1, 2, 2, 3, 5, 6])
    expect(binarySort([2, 1, 1])).toEqual([1, 1, 2])
    expect(binarySort([2, 1, 1, 3])).toEqual([1, 1, 2, 3])
    expect(binarySort([2, 1, 1, 3])).toEqual([1, 1, 2, 3])
  })

  test('big array', () => {
    expect(binarySort(randData)).toEqual(ascData)
    expect(binarySort(randData, false)).toEqual(descData)
  })
})
