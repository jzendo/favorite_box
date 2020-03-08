/* global describe, test, expect, jest */
import defer from '../defer'

const isPromiseInstance = promise => promise instanceof Promise
const isFunction = t => t && typeof t === 'function'

const resolvWith = v => Promise.resolve(v)

describe('common/defer', () => {
  test('call and return plain object which including `promise`, `resolve`, `reject` fields', () => {
    const { promise, resolve, reject } = defer()

    expect(isPromiseInstance(promise)).toBeTruthy()
    expect(isFunction(resolve)).toBeTruthy()
    expect(isFunction(reject)).toBeTruthy()
  })

  test('apply the returned plain object with resolve', async () => {
    const { promise, resolve } = defer()

    const fn1 = jest.fn()
    const fn2 = jest.fn()

    resolve()

    await promise

    fn1()

    await resolvWith()
    fn2()

    expect(fn1).toHaveBeenCalled()
    expect(fn2).toHaveBeenCalled()
  })

  test('apply the returned plain object with reject', async () => {
    const { promise, reject } = defer()

    const testValue = new Error('test')

    const fn1 = jest.fn()
    const fn2 = jest.fn()

    reject(testValue)

    try {
      await promise
      // Skip the following, as throw a exception at the above
      fn1()
    } catch (e) {
      fn2()
    }

    expect(fn1).toHaveBeenCalledTimes(0)
    expect(fn2).toHaveBeenCalledTimes(1)
  })
})
