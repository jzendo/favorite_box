/* global describe, expect, test, jest */

import binarySearch from '../default'

const applyMatchedTestCase = ({ arr, testValue, testValueIndex }, opt) => {
  describe(`match the item ${JSON.stringify(
    testValue
  )} [index=${testValueIndex}, target = ${JSON.stringify(arr)}]`, () => {
    test('ok', () => {
      const r = binarySearch(arr, testValue, opt)
      expect(r).not.toBeNull()
      expect(r.index).toEqual(testValueIndex)
      expect(r.matched).toEqual(testValue)
    })
  })
}

const applyUnmatchedTestCase = ({ arr, testValue }, opt) => {
  describe(`not match the item ${JSON.stringify(
    testValue
  )} [target = ${JSON.stringify(arr)}]`, () => {
    test('ok', () => {
      const r = binarySearch(arr, testValue, opt)
      expect(r).toBeNull()
    })
  })
}

describe('binary-search/default', () => {
  const testArgs = (...args) => {
    expect(() => {
      binarySearch(...args)
    }).toThrow()
  }

  test('invalid parameters', () => {
    testArgs()
    testArgs(1)
    testArgs([])
    testArgs([1])
    testArgs([1, 2])
  })

  test('apply compare callback', () => {
    const fn = jest.fn()
    const r = binarySearch([2, 6, 3], 6, {
      compare (item, arrayItem) {
        fn()
        if (item === arrayItem) return 0
        else if (item < arrayItem) return -1
        else return 1
      }
    })

    expect(r).not.toBeNull()
    expect(fn).toBeCalled()
  })

  test('apply sort callback', () => {
    const fn = jest.fn()
    const r = binarySearch([2, 6, 3], 6, {
      sort (arr) {
        // [2, 3, 6]
        fn()
        arr.sort((a, b) => (a === b ? 0 : a < b ? -1 : 1))
        return arr
      }
    })

    expect(r).not.toBeNull()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  // Matched
  applyMatchedTestCase({
    arr: [2, 6],
    testValue: 6,
    testValueIndex: 1
  })

  applyMatchedTestCase({
    arr: [2, 6, 3],
    testValue: 6,
    testValueIndex: 1
  })

  applyMatchedTestCase({
    arr: [1, 9, 21, 66, 99, 2, 6, 3],
    testValue: 6,
    testValueIndex: 6
  })

  // User custom `compare`
  applyMatchedTestCase(
    {
      arr: [2, 6, 3],
      testValue: 6,
      testValueIndex: 1
    },
    {
      compare (item, arrayItem) {
        if (item === arrayItem) return 0
        else if (item < arrayItem) return -1
        else return 1
      }
    }
  )

  // User custom `sort`
  applyMatchedTestCase(
    {
      arr: [2, 6, 3],
      testValue: 6,
      testValueIndex: 2 // Refer the following
    },
    {
      sort (arr) {
        // [2, 3, 6]
        arr.sort((a, b) => (a === b ? 0 : a < b ? -1 : 1))
        return arr
      }
    }
  )

  applyMatchedTestCase(
    {
      arr: [{ value: 2 }, { value: 6 }, { value: 8 }],
      testValue: { value: 8 },
      testValueIndex: 2
    },
    {
      compare (item, { value }) {
        if (item.value === value) return 0
        else if (item.value < value) return -1
        else return 1
      }
    }
  )

  // Un-matched
  applyUnmatchedTestCase({
    arr: [2, 6, 3],
    testValue: 8
  })

  applyUnmatchedTestCase({
    arr: [2, 1],
    testValue: 8
  })

  applyUnmatchedTestCase(
    {
      arr: [{ value: 2 }, { value: 6 }, { value: 8 }],
      testValue: { value: 22 }
    },
    {
      compare (item, { value }) {
        if (item.value === value) return 0
        else if (item.value < value) return -1
        else return 1
      }
    }
  )
})
