/* global describe, test, expect */
import memoizedFunc from '../memoizedFunc'
// import getFuncArgNames from '../../common/getFuncArgNames'
import { applyTestFnForSingleParam } from './common/memoizedFuncHelper'

describe('memoizedFunc', () => {
  describe('single param func', () => {
    const singleParamArrowFn = a => a
    applyTestFnForSingleParam(singleParamArrowFn)

    // eslint-disable-next-line
    const singleParamFn = function singleParamFn (/* a) */ a) {
      return a
    }
    applyTestFnForSingleParam(singleParamFn)
  })

  describe('multi params func', () => {
    // eslint-disable-next-line
    const singleParamArrowFn = (a, b) => a
    applyTestFnForSingleParam(singleParamArrowFn)

    // Eslint should be disable for next line, for `user dirty function declare`
    // eslint-disable-next-line
    const singleParamFn = function singleParamFn (/* a) */ a, b) {
      return a
    }
    applyTestFnForSingleParam(singleParamFn)
  })

  test('the first parameter should be function', () => {
    expect(() => {
      memoizedFunc()
    }).toThrow()

    expect(() => {
      memoizedFunc(1)
    }).toThrow()

    expect(() => {
      memoizedFunc(true)
    }).toThrow()
  })
})
