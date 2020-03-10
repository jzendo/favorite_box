import invariant from '@jzendo/utils/lib/common/invariant'
import isArray from '@jzendo/utils/lib/common/isArray'
import traverse from '@jzendo/utils/lib/array/traverse'

/**
 * Sort array with `binary sort`
 *
 * @param {Array} arr the sorting array
 * @param {Boolean} isAsc asc or desc
 */
export default function binarySort (arr, isAsc = true) {
  invariant(arguments.length >= 1, 'One parameter(s) at least')
  invariant(isArray(arr), 'The first parameter should be array')

  // Skip binary-sort when array has only one item at most
  if (arr.length <= 1) return arr

  const sortedArray = sortArray(arr)
  return isAsc ? sortedArray : sortedArray.reverse()
}

function sortArray (arr) {
  const { indexAt, size } = traverse(arr)
  const count = size()

  if (count <= 0) return []
  if (count <= 1) return arr
  if (count === 2) {
    if (arr[0] > arr[1]) return arr.reverse()
    return arr
  }

  const midIndex = Math.floor(count / 2)

  const left = []
  const right = []
  const middle = []

  const midRefer = arr[midIndex]

  let itm
  let i = -1

  while (++i < size()) {
    itm = indexAt(i)

    if (itm === midRefer) {
      middle.push(itm)
    } else if (itm < midRefer) {
      left.push(itm)
    } else {
      right.push(itm)
    }
  }

  const r = [...sortArray(left), ...middle, ...sortArray(right)]

  return r
}
