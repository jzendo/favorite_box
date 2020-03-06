// Node enviroment
const generatorFnRunner = require('../lib/func/generatorFuncRunner').default

// Example: throw error
const gfn1 = function * () {
  // eslint-disable-next-line
  const c = yield new Promise(r => setTimeout(() => r('c')))
  return c + 'd'
}

const gfn2 = function * () {
  const a = 'a'
  // eslint-disable-next-line
  const b = yield new Promise((_, r) => setTimeout(() => r(new Error('aa'))))
  const c = yield * gfn1()

  return a + b + c
}

generatorFnRunner(gfn2)
  .then(v => console.log(v))
  .catch(err => {
    console.log('Exception:')
    console.error(err)
  })

// Example: normal
function * anotherGeneratorFunc () {
  const a = ''
  const b = yield new Promise(resolve => {
    setTimeout(() => resolve(''), 3000)
  })

  return a + b + 'c'
}

generatorFnRunner(function * () {
  const a = 'a'

  const b = yield new Promise(resolve => {
    setTimeout(() => resolve('b'), 3000)
  })

  const c = yield * anotherGeneratorFunc()

  return a + b + c
}).then(v => console.log('v: ', v))
