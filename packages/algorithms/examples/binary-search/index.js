// node

const binarySearch = require('../../lib/binary-search/default').default

const arr = [1, 9, 21, 66, 99, 2, 6, 3]
const findItem = 6

console.log(`\nFind ${JSON.stringify(findItem)} in ${JSON.stringify(arr)}:`)
console.log('\nResult:')
console.log(JSON.stringify(binarySearch(arr, findItem), null, 2))
