// Node
const heap = require('../../lib/permutation/heap').default

// NOTE: ${arr.length}! === 6! === 720
const arr = [1, 2, 3, 4, 5, 6]

heap(arr, {
  onValue (val) {
    console.log("Permutation's value: ", val)
  },
  onComplete () {
    console.log('Done!')
  }
})
