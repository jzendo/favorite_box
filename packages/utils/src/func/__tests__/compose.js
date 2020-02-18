/* global describe, test, expect */

import compose from '../compose'

describe('compose', () => {
  test('arg number or type is not legal', () => {
    // Test no arguments
    expect(() => {
      compose()()
    }).toThrow()

    // Test illegal argument: number, number
    expect(() => {
      compose(1, 2)()
    }).toThrow()

    // Test illegal argument: string, boolean
    expect(() => {
      compose('Hello', true)()
    }).toThrow()

    // Test one argument: () => {}
    expect(() => {
      compose(() => {})()
    }).toThrow()

    // Test two argument: () => {}, boolean
    expect(() => {
      compose(() => {}, true)()
    }).toThrow()
  })

  test('composedFn.args', () => {
    const fn1 = () => { }
    const fn2 = () => { }
    const fn3 = () => { }

    const composedFn = compose(fn1, fn2, fn3)

    expect(composedFn.args.length).toEqual(3)
    expect(composedFn.args[0]).toEqual(fn1)
    expect(composedFn.args[1]).toEqual(fn2)
    expect(composedFn.args[2]).toEqual(fn3)
  })

  test('normal composed', () => {
    const arrChar = ['a', 'b', 'c']

    let result = ''
    const actual = arrChar.join('')

    const fn1 = () => { result += arrChar[0] }
    const fn2 = () => { result += arrChar[1] }
    const fn3 = () => { result += arrChar[2] }

    compose(fn1, fn2, fn3)()

    expect(result).toEqual(actual)
  })

  test('reverse composed', () => {
    const arrChar = ['a', 'b', 'c']

    let result = ''
    const actual = arrChar.slice(0).reverse().join('')

    const fn1 = () => { result += arrChar[0] }
    const fn2 = () => { result += arrChar[1] }
    const fn3 = () => { result += arrChar[2] }

    compose(fn1, fn2, fn3, true)()

    expect(result).toEqual(actual)
  })
})
