/* global describe, test, expect */
import getFuncArgNames from '../getFuncArgNames'

const applyArgsTestCase = args => {
  test(`the function parameters should be "[${args.join(', ')}]"`, () => {
    const argCount = args.length
    // eslint-disable-next-line no-new-func
    const testFn = new Function(...args, `return ${argCount}`)

    // The result should be equaled to `args`
    expect(getFuncArgNames(testFn)).toEqual(args)
    // The returned value should be the args count
    expect(testFn()).toEqual(argCount)
  })
}

describe('common/getFuncArgNames', () => {
  test('invalid parameters', () => {
    expect(getFuncArgNames()).toBeNull()
    expect(getFuncArgNames(1)).toBeNull()
    expect(getFuncArgNames(true)).toBeNull()
  })

  test('should be a function', () => {
    expect(getFuncArgNames).not.toBeUndefined()
    const isFunc = getFuncArgNames && typeof getFuncArgNames === 'function'
    expect(isFunc).toBeTruthy()
  })

  // Apply the specified args
  applyArgsTestCase([])
  applyArgsTestCase(['a', 'd', 'c'])
})
