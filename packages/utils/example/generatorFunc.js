// Node enviroment
const generatorFnRunner = require('../lib/func/generatorFuncRunner').default

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
