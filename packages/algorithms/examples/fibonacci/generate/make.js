// Node

const x = 100

const prevs = [0, 1]
let updateAt = 1
let tmp

function generateFibonacci (callback) {
  prevs.forEach((itm, i) => {
    callback(i, itm)
  })

  for (let i = 2; i <= x; i++) {
    updateAt = (updateAt + 1) % 2
    tmp = prevs[0] + prevs[1]
    prevs[updateAt] = tmp
    callback(i, tmp)
  }
}

generateFibonacci((i, itm) => {
  console.log(`${i}:${itm}`)
})
