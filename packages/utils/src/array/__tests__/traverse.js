/* global describe, test, expect, beforeEach, afterEach */
import traverse from '../traverse'

describe('array/helper @traverse', () => {
  describe('normal', () => {
    let arr

    beforeEach(() => {
      arr = [1, 2, 6]
    })

    afterEach(() => {
      arr = undefined
    })

    test('first && last && size', () => {
      const {
        first,
        last,
        size,
        randItem,
        indexAt,
        inArray,
        lastIndex
      } = traverse(arr)

      expect(first()).toEqual(arr[0])
      expect(last()).toEqual(arr[arr.length - 1])
      expect(size()).toEqual(arr.length)
      expect(lastIndex()).toEqual(arr.length - 1)

      expect(inArray()).toBeFalsy()

      let rndItem

      // Default
      rndItem = randItem()
      expect(inArray(rndItem)).toBeTruthy()

      // Valid index
      rndItem = randItem(0)
      expect(inArray(rndItem)).toBeTruthy()

      // Out of band index (will be reset to a valid index)
      rndItem = randItem(100)
      expect(inArray(rndItem)).toBeTruthy()

      expect(indexAt(0)).toEqual(first())
      expect(indexAt(lastIndex())).toEqual(last())

      // Test invalid parameter
      rndItem = randItem('a')
      expect(inArray(rndItem)).toBeTruthy()
    })

    test('empty && isEmpty', () => {
      const { empty, isEmpty } = traverse(arr)

      // 1) Check empty ?
      expect(isEmpty()).toBeFalsy()

      // 2) Empty array && Check empty
      empty()
      expect(isEmpty()).toBeTruthy()
    })

    test('`pop` && `popFirst` and `push` && `pushFirst` with one item', () => {
      const { first, last, size, push, pop, pushFirst, popFirst } = traverse(
        arr
      )

      const testValue = 5
      let arrSize = size()

      // Test push result and last item
      arrSize += 1
      expect(push(testValue)).toEqual(arrSize)
      expect(last()).toEqual(testValue)

      // Test pop and check value
      arrSize -= 1
      expect(pop()).toEqual(testValue)
      expect(size()).toEqual(arrSize)

      // Test pushFirst result and last item
      arrSize += 1
      expect(pushFirst(testValue)).toEqual(arrSize)
      expect(first()).toEqual(testValue)

      // Test popFirst and check value
      arrSize -= 1
      expect(popFirst()).toEqual(testValue)
      expect(size()).toEqual(arrSize)
    })

    test('`push` && `pushFirst` with multi items', () => {
      const {
        first,
        last,
        size,
        lastIndex,
        indexAt,
        push,
        pushFirst
      } = traverse(arr)

      const testValue1 = 5
      const testValue2 = 6

      let arrSize = size()

      // Test push result and last item
      arrSize += 2
      expect(push(testValue1, testValue2)).toEqual(arrSize)
      expect(last()).toEqual(testValue2)
      expect(indexAt(lastIndex() - 1)).toEqual(testValue1)

      // Test pushFirst result and last item
      arrSize += 2
      expect(pushFirst(testValue1, testValue2)).toEqual(arrSize)
      expect(first()).toEqual(testValue1)
      expect(indexAt(1)).toEqual(testValue2)
    })

    test('empty array', () => {
      const { lastIndex, inArray, randItem } = traverse([])

      // Test size <= 0
      expect(lastIndex()).toEqual(0)
      // Test size() === 0
      expect(inArray(2)).toBeFalsy()
      // Test size() ===0
      expect(randItem()).toBeFalsy()
    })
  })

  describe('illegal', () => {
    test('invalid parameter', () => {
      expect(() => {
        // eslint-disable-next-line
        const {} = traverse(1)
      }).toThrow()

      expect(() => {
        // eslint-disable-next-line
        const {} = traverse(true)
      }).toThrow()

      expect(() => {
        // eslint-disable-next-line
        const {} = traverse(function () {})
      }).toThrow()
    })
  })
})
