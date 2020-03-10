import invariant from '@jzendo/utils/lib/common/invariant'
import isArray from '@jzendo/utils/lib/common/isArray'
import traverse from '@jzendo/utils/lib/array/traverse'

/**
 * Compare two items
 *
 * @param {*} item comparing item A
 * @param {*} arrayItem comparing item B
 * @returns {number} 0 | 1 | -1
 */
const defaultCompare = (item, arrayItem) => {
  if (item === arrayItem) return 0
  else if (item < arrayItem) return -1
  else return 1
}

/**
 * Find the item in array with binary search
 *
 * @param {Array} arr the searching array
 * @param {*} item the searching value
 * @param {Object} optional optional config
 * @param {compareFunction} optional.compare https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Description
 */
export default function binarySearch (
  arr,
  item,
  { compare = defaultCompare, sort } = {}
) {
  invariant(arguments.length >= 2, 'Two parameters at least')
  invariant(
    isArray(arr) && arr.length >= 2,
    'The first parameter should be array'
  )
  invariant(item ?? true, 'The second parameter should be array')

  let cloned

  // Sort firstly (ensure asc or desc)
  if (sort) {
    // Use sort algorithms
    arr = sort(arr)
    if (!arr) {
      if (process.env.NODE_ENV === 'development') {
        console.log(
          'The "sort" method should return a valid array that has been sort.'
        )
      }
      return null
    }
    // Get a copy array
    cloned = copyArray(arr)
  } else {
    // Use default sort algorithms
    // Get a copy array
    cloned = copyArray(arr)
    cloned.sort((a, b) => compare(a.value, b.value))
  }

  // GC object
  const dispose = () => {
    cloned = null
  }

  let isAsc = false
  const { first, last, size } = traverse(cloned)
  const compareFirstAndLastResult = compare(first().value, last().value)

  // The array has the same items.
  if (compareFirstAndLastResult === 0) {
    dispose()
    return arr[0] // return the origin array first iten
  }

  // Asc Or Desc
  if (compareFirstAndLastResult === -1) {
    isAsc = true
  } else {
    isAsc = false
  }

  const midIndex = Math.floor(size() / 2)
  const startIndex = 0
  const endIndex = size() - 1

  const result = searchArray(cloned, item, {
    midIndex,
    startIndex,
    endIndex,
    isAsc,
    compare
  })

  dispose()

  if (!result) return null

  return {
    index: result.index,
    matched: result.value
  }
}

function copyArray (arr) {
  return arr.map((itm, i) => ({
    value: itm,
    index: i
  }))
}

function searchArray (
  arr,
  item,
  { midIndex, startIndex, endIndex, isAsc, compare }
) {
  if (endIndex - startIndex <= 1) {
    // Only one
    if (endIndex === startIndex) {
      if (!compare(item, arr[startIndex].value)) return arr[startIndex]
      return null
    }

    // Compare left
    if (!compare(item, arr[startIndex].value)) return arr[startIndex]
    // Compare right
    if (!compare(item, arr[endIndex].value)) return arr[endIndex]
    return null
  }

  let startIndex_
  let endIndex_

  // Get start & end index
  const getArrIndex = condition => {
    let startIndex_
    let endIndex_

    if (condition) {
      startIndex_ = startIndex
      endIndex_ = midIndex
    } else {
      startIndex_ = midIndex
      endIndex_ = endIndex
    }

    return [startIndex_, endIndex_]
  }

  const r = compare(item, arr[midIndex].value)

  if (r === 0) return arr[midIndex]
  else if (r === -1) {
    // -1
    ;[startIndex_, endIndex_] = getArrIndex(isAsc)
  } else {
    // 1
    ;[startIndex_, endIndex_] = getArrIndex(!isAsc)
  }

  const midIndex_ = Math.floor((endIndex_ - startIndex_ + 1) / 2) + startIndex_

  return searchArray(arr, item, {
    midIndex: midIndex_,
    startIndex: startIndex_,
    endIndex: endIndex_,
    isAsc,
    compare
  })
}
