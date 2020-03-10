import isArray from '../common/isArray'

const INVALID_INDEX = -1
const RND_DEFAULT_INDEX = INVALID_INDEX

/**
 * The traversing utils for array
 *
 * @param {Array} arr the target array
 * @returns {Object}
 */
export default function traverse (arr) {
  if (!isArray(arr)) {
    throw new TypeError('The parameter should be an array.')
  }

  const first = () => arr[0]
  const size = () => arr.length

  const lastIndex = () => {
    const arrSize = size()
    if (arrSize > 0) return arrSize - 1
    return 0
  }

  const last = () => {
    const idx = lastIndex()
    return arr[idx]
  }

  const inArray = testItem => {
    if (testItem === undefined || size() === 0) return false

    // Find one
    return arr.find(item => item === testItem) !== undefined
  }

  const randItem = (rnd = RND_DEFAULT_INDEX) => {
    const len = size()
    if (len === 0) return undefined

    let idx = Number(rnd)
    // Ensure the invalid `rnd` is corrected to a valid index
    if (isNaN(idx)) idx = RND_DEFAULT_INDEX

    if (idx === RND_DEFAULT_INDEX || idx < 0 || idx >= len) {
      idx = Math.floor(Math.random() * len)
    }

    return arr[idx]
  }

  const indexAt = idx => {
    return randItem(idx)
  }

  const isEmpty = () => size() === 0

  const empty = () => {
    // Set `length = 0` to empty array
    arr.length = 0
  }

  // Return pop-value
  const pop = () => arr.pop()
  // Return size (tail)
  const push = (...args) => {
    arr.push(...args)
    return size()
  }

  // Return pop-value
  const popFirst = () => arr.shift()
  // Return size(head)
  const pushFirst = (...args) => {
    arr.unshift(...args)
    return size()
  }

  // Exports
  return {
    first,
    size,
    last,
    inArray,
    randItem,
    lastIndex,
    indexAt,

    isEmpty,
    empty,

    pop,
    push,
    popFirst,
    pushFirst
  }
}
