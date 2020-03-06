/* global describe, test, expect */
import generatorFuncRunner from '../generatorFuncRunner'

// Returned-value should be 2
function * anotherGeneratorFunc1 () {
  yield 1
  yield 2
  yield 3
  // ... yield

  // NOTE: the returned-value is important!
  return 2
}

// Returned-value consistance [ Refer `anotherGeneratorFunc1` ]
function * anotherGeneratorFunc2 () {
  const a = yield 1
  const b = yield new Promise(resolve => {
    setTimeout(() => resolve(1), 100)
  })

  return a + b
}

function * testGeneratorFunc1 () {
  const a = 1
  const b = 2
  return a + b
}

function * testGeneratorFunc2 () {
  const a = 1
  const b = yield 2
  return a + b
}

function * testGeneratorFunc3 () {
  const a = 1
  const b = yield * anotherGeneratorFunc1()
  return a + b
}

function * testGeneratorFunc5 () {
  const a = 1
  const b = yield * anotherGeneratorFunc2()
  return a + b
}

function * testGeneratorFunc6 () {
  const a = 1
  const b = yield new Promise(resolve => {
    // Timeout amount is not important, but make `call resolve` async is important
    setTimeout(() => resolve(2), 100)
  })

  return a + b
}

const getFuncBody = func => {
  const name = func.name
  if (name) return `"{func name} = ${name}"`

  return '"{func message} = ' + func.toString().split('\n')[0] + // First line (including func declare)
    '"'
}

const testCase = testGeneratorFunc => {
  describe(`generatorFuncRunner ${getFuncBody(testGeneratorFunc)}`, () => {
    test('callback mode', done => {
      generatorFuncRunner(testGeneratorFunc, {
        onReturnValue (_, v) {
          expect(v).toBe(3)
          done()
        }
      })
    })

    const asyncThenable = done => v => {
      expect(v).toBe(3)
      done()
    }

    test('promise mode with reject', done => {
      const testError = new Error('test')
      function * testGeneratorFunc () {
        const a = 1
        const b = yield new Promise((resolve, reject) => {
          // Timeout amount is not important, but make `call resolve` async is important
          setTimeout(() => reject(testError), 100)
        })
        return a + b
      }

      generatorFuncRunner(testGeneratorFunc)
        .catch(err => {
          expect(err).toEqual(testError)
          done()
        })
    })

    test('promise mode with `no opt`', done => {
      generatorFuncRunner(testGeneratorFunc)
        .then(asyncThenable(done))
    })

    test('promise mode with `opt == true`', done => {
      generatorFuncRunner(testGeneratorFunc, true)
        .then(asyncThenable(done))
    })
  })
}

describe('generatorFuncRunner', () => {
  testCase(testGeneratorFunc1)
  testCase(testGeneratorFunc2)
  testCase(testGeneratorFunc3)
  testCase(testGeneratorFunc5)
  testCase(testGeneratorFunc6)

  describe('invalid arguments', () => {
    test('no argument', () => {
      expect(() => {
        generatorFuncRunner()
      }).toThrow()
    })

    test('not generator func', () => {
      expect(() => {
        generatorFuncRunner(() => {})
      }).toThrow()
    })

    test('not boolean and plain object', () => {
      expect(() => {
        generatorFuncRunner(function * () {}, 123)
      }).toThrow()
    })
  })
})
