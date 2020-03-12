// node

const binarySort = require('../../lib/sort/binarySort').default

const arr = [
  1,
  9,
  21,
  66,
  99,
  2,
  6,
  3,
  123,
  321,
  33,
  55,
  88,
  99,
  13123,
  1231225,
  90234,
  89234,
  5119990,
  1233211239
]

console.log(`\nSorting ${JSON.stringify(arr)} in DESC ...`)
console.log(`\nResult: ${JSON.stringify(binarySort(arr, false), null, 2)}`)
