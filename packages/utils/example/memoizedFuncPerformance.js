// Node enviroment

const memoizedFunc = require('../build_cjs/func/memoizedFunc').default


const getTime = () => Date.now()

const TEST_COUNT = 100

const data = [
  [1, 2, 3, 6],
  [4, 5, 6, 15]
]

const testFunc = (a, b, c) => {
  let r = 0

  // Expensive calc
  for (let i = 0; i < TEST_COUNT; i++) {
    r += (a + b + c)
  }

  return r
}

// When call the same args multi-time in series that will be opt by `memoizedFunc`
const loopCalled = fn => {
  let r = 0
  let sum = 0
  for (let j = 0; j < data.length - 1; j++)  {
    r = 0
    sum = TEST_COUNT * TEST_COUNT * (data[j][data[j].length - 1] || 0)

    for (let i = 0; i < TEST_COUNT; i++) {
      r += fn(...data[j])
    }

    console.log(`\nThe calc result(${ r }) is equal to ${ sum }? ${r === sum}`)
  }
}

const userStringify = (a, b, c) => {
  return a + '_' + b + '_' + c
}

const memoizedFuncTest = (fn) => {
  const mFn = memoizedFunc(fn, userStringify)
  const start = getTime()
  loopCalled(mFn)
  const end = getTime()

  return {
    duration: end - start
  }
}

const normalFuncTest = (fn) => {
  const start = getTime()
  loopCalled(fn)
  const end = getTime()

  return {
    duration: end - start
  }
}


console.log('\nThe memoized function: ', memoizedFunc(testFunc).toString())

console.log('\n\nMetrics:')
console.log('\n  - normal called duration: ', normalFuncTest(testFunc).duration)
console.log('\n')
console.log('\n  - memoized called duration: ', memoizedFuncTest(testFunc).duration)
