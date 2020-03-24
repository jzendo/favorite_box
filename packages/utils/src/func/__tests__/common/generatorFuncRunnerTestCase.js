/* global describe, test, expect */

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
  yield
  const a = 1
  const b = 2
  return a + b
}

function * testGeneratorFunc2 () {
  // eslint-disable-next-line no-unused-vars
  const t = yield // t == undefined
  const a = 1
  const b = yield 2
  return (t === undefined ? 0 : 1) + a + b
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

  return (
    '"{func message} = ' +
    func.toString().split('\n')[0] + // First line (including func declare)
    '"'
  )
}

export default generatorFuncRunner => {
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

      test('promise mode with `no opt`', done => {
        generatorFuncRunner(testGeneratorFunc).then(asyncThenable(done))
      })

      test('promise mode with `opt == true`', done => {
        generatorFuncRunner(testGeneratorFunc, true).then(asyncThenable(done))
      })
    })
  }

  const exceptionTestCase = (desc, testGeneratorFunc, testError) => {
    test(`iterable exception with ${desc}`, done => {
      const catchError = err => {
        expect(err).toEqual(testError)
        done()
      }

      generatorFuncRunner(testGeneratorFunc, {
        onReturnValue (err, val) {
          expect(val).toEqual(null)
          catchError(err)
        }
      })

      generatorFuncRunner(testGeneratorFunc).catch(catchError)
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

    test('exception when call iterable', done => {
      const testError = new Error('test')
      const testError2 = new Error('test2')

      generatorFuncRunner(function * () {
        throw testError
        // eslint-disable-next-line no-unreachable
        throw testError2
      }).catch(err => {
        expect(err).toEqual(testError)
        done()
      })
    })

    describe('exception', () => {
      const testError = new Error('test')

      const noramlGeneratorFunc = function * () {
        return 1
      }

      exceptionTestCase(
        'start exception',
        function * () {
          const a = 1
          throw testError
          /* eslint-disable */
          const b = yield new Promise((resolve, reject) => {
            // Timeout amount is not important, but make `call resolve` async is important
            setTimeout(() => resolve(1), 100)
          })
          return a + b
          /* eslint-enable */
        },
        testError
      )

      exceptionTestCase(
        'middle exception',
        function * () {
          const a = 1
          const b = yield new Promise((resolve, reject) => {
            // Timeout amount is not important, but make `call resolve` async is important
            setTimeout(() => resolve(1), 100)
          })

          throw testError

          /* eslint-disable */
          return a + b
          /* eslint-enable */
        },
        testError
      )

      exceptionTestCase(
        'middle exception after noraml yield',
        function * () {
          const a = 1
          const b = yield new Promise((resolve, reject) => {
            // Timeout amount is not important, but make `call resolve` async is important
            setTimeout(() => resolve(1), 100)
          })

          const c = yield * noramlGeneratorFunc()

          throw testError

          /* eslint-disable */
          return a + b + c
          /* eslint-enable */
        },
        testError
      )

      const anotherGeneratorFunc = function * () {
        throw testError
        /* eslint-disable */
        return 1
        /* eslint-enable */
      }

      const anotherGeneratorFunc2 = function * () {
        const b = yield new Promise(resolve => {
          setTimeout(() => resolve(1), 100)
        })

        throw testError
        /* eslint-disable */
        return b
        /* eslint-enable */
      }

      const anotherGeneratorFunc3 = function * () {
        // eslint-disable-next-line
        const b = yield new Promise((resolve, reject) => {
          setTimeout(() => reject(testError), 100)
        })

        return 1
      }

      exceptionTestCase(
        'yield another exception',
        function * () {
          const a = 1
          const b = yield new Promise((resolve, reject) => {
            // Timeout amount is not important, but make `call resolve` async is important
            setTimeout(() => resolve(1), 100)
          })

          const c = yield * anotherGeneratorFunc()

          return a + b + c
        },
        testError
      )

      exceptionTestCase(
        'yield another exception after resolve promise',
        function * () {
          const a = 1
          const b = yield new Promise((resolve, reject) => {
            // Timeout amount is not important, but make `call resolve` async is important
            setTimeout(() => resolve(1), 100)
          })

          const c = yield * anotherGeneratorFunc2()

          return a + b + c
        },
        testError
      )

      exceptionTestCase(
        'yield another exception after reject promise',
        function * () {
          const a = 1
          const b = yield new Promise((resolve, reject) => {
            // Timeout amount is not important, but make `call resolve` async is important
            setTimeout(() => resolve(1), 100)
          })

          const c = yield * anotherGeneratorFunc3()

          return a + b + c
        },
        testError
      )

      test('promise mode with reject', done => {
        function * testGeneratorFunc () {
          const a = 1
          const b = yield new Promise((resolve, reject) => {
            // Timeout amount is not important, but make `call resolve` async is important
            setTimeout(() => reject(testError), 100)
          })
          return a + b
        }

        generatorFuncRunner(testGeneratorFunc).catch(err => {
          expect(err).toEqual(testError)
          done()
        })
      })
    })

    describe('nest call', () => {
      const testError = new Error('test')

      test('normal', done => {
        const innerGeneratorFunc = function * () {
          const a = 0
          const b = yield new Promise(resolve => {
            setTimeout(() => resolve(1), 800)
          })

          return a + b
        }

        const testGeneratorFunc = function * () {
          const a = yield 1
          const b = yield new Promise(resolve => {
            const innerRunnerPromise = generatorFuncRunner(innerGeneratorFunc)
            resolve(innerRunnerPromise)
          })

          const c = yield 1

          return a + b + c
        }

        generatorFuncRunner(testGeneratorFunc).then(v => {
          expect(v).toEqual(3)
          done()
        })
      })

      test('exception', done => {
        const innerGeneratorFunc = function * () {
          const a = 0
          const b = yield new Promise((resolve, reject) => {
            setTimeout(() => reject(testError), 800)
          })

          return a + b
        }

        const testGeneratorFunc = function * () {
          const a = yield 1
          const b = yield new Promise(resolve => {
            const innerRunnerPromise = generatorFuncRunner(innerGeneratorFunc)
            resolve(innerRunnerPromise)
          })

          const c = yield 1

          return a + b + c
        }

        generatorFuncRunner(testGeneratorFunc).catch(err => {
          expect(err).toEqual(testError)
          done()
        })
      })
    })
  })
}
