/*
  Refer: https://www.geeksforgeeks.org/heaps-algorithm-for-generating-permutations/
        https://iq.opengenus.org/heaps-algorithm-for-generating-permutations/

  Heap's Algorithm:
    1). The algorithm generates (n-1)! permutations of the first n-1 elements,
      adjoining the last element to each of these.
      This will generate all of the permutations that end with the last element.

    2). If n is odd, swap the first and last element and if n is even,
      then swap the ith element (i is the counter starting from 0)
      and the last element and repeat the above algorithm till i is less than n.

    3). In each iteration, the algorithm will produce all the permutations that
      end with the current last element.
*/

import factorial from '../factorial/default'
import invariant from '@jzendo/utils/lib/common/invariant'
import isArray from '@jzendo/utils/lib/common/isArray'

const swapArrayItems = (arr, indexA, indexB) => {
  ;[arr[indexB], arr[indexA]] = [arr[indexA], arr[indexB]]
}

const generateFactory = callback =>
  function generate (n, arr) {
    if (n === 1) callback(arr)
    else {
      for (let i = 0; i < n; i++) {
        generate(n - 1, arr)

        if (n % 2 === 1) {
          swapArrayItems(arr, i, n - 1)
        } else {
          swapArrayItems(arr, 0, n - 1)
        }
      }
    }
  }

const ctor = () => {}

export default function heap (arr, opt = {}) {
  invariant(
    isArray(arr) && arr.length > 2,
    'The first parameter should be array.'
  )

  const n = arr.length

  const { onValue = ctor, onComplete = ctor, onError = ctor } = opt

  if (n <= 1) {
    onError(new Error('The array should be 2 items at least.'))
    return
  }

  let currentItems = 0
  const total = factorial(n)

  const userCompleteSupport = onComplete !== ctor

  const callback = val => {
    try {
      currentItems++

      // NOTE: val is refered to the current array,
      //  will be changed when callback is called!
      onValue(val)
    } catch (err) {}

    if (userCompleteSupport && currentItems === total) {
      onComplete()
    }
  }

  const generate = generateFactory(callback)
  generate(n, arr)
}
