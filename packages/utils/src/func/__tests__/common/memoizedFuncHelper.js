/* global jest, expect, test */
import memoizedFunc from '../../memoizedFunc'
import getFuncArgNames from '../../../common/getFuncArgNames'

export const applyTestFnForSingleParam = testFn => {
  test(`func name: ${testFn.name}`, () => {
    const cacheGetterMockFn = jest.fn()
    const skipGetterMockFn = jest.fn()
    const cacheSetterMockFn = jest.fn()
    const skipSetterMockFn = jest.fn()

    setHookers(testFn, {
      cacheGetter: cacheGetterMockFn,
      skipGetter: skipGetterMockFn,
      cacheSetter: cacheSetterMockFn,
      skipSetter: skipSetterMockFn
    })

    const mFn = memoizedFunc(testFn)

    expect(mFn.length).toEqual(testFn.length)

    // Should be the same arguments and named
    expect(getFuncArgNames(mFn)).toEqual(getFuncArgNames(testFn))

    // First call
    mFn(1)
    expect(cacheGetterMockFn).not.toBeCalled()
    expect(skipGetterMockFn).toBeCalledTimes(1)
    expect(cacheSetterMockFn).toBeCalledTimes(1)
    expect(skipSetterMockFn).not.toBeCalled()

    // Re-call the same argument
    mFn(1)
    expect(cacheGetterMockFn).toBeCalledTimes(1)
    expect(skipGetterMockFn).toBeCalledTimes(1)
    expect(cacheSetterMockFn).toBeCalledTimes(1)
    expect(skipSetterMockFn).not.toBeCalled()

    // Call another argument
    mFn(2)
    expect(cacheGetterMockFn).toBeCalledTimes(1)
    expect(skipGetterMockFn).toBeCalledTimes(2)
    expect(cacheSetterMockFn).toBeCalledTimes(2)
    expect(skipSetterMockFn).not.toBeCalled()

    // Dispose and call any argument
    mFn.dispose()
    mFn(1)
    expect(cacheGetterMockFn).toBeCalledTimes(1)
    expect(skipGetterMockFn).toBeCalledTimes(3)
    expect(cacheSetterMockFn).toBeCalledTimes(2)
    expect(skipSetterMockFn).toBeCalledTimes(1)
  })
}

/*
 * test helper hookers:

 // ----------- Get value from cached -----------
  // in get
  __onCacheGetter(argNames, uniqueArgKey, cacheUtil)

  // fall in get
  __onSkipGetter(disposed, argNames, uniqueArgKey, cacheUtil)

  // ----------- Set value to cached -----------
  // in set
  __onCacheSetter(argNames, uniqueArgKey, cacheUtil)

  // fall in set
  __onSkipSetter(disposed, r !== undefined, argNames, uniqueArgKey, cacheUtil)
*/
export const setHookers = (testFn, hookCallback = {}) => {
  /*
  let inGetter = false
  let skipGetter = false
  let inSetter = false
  let skipSetter = false
  */
  /* eslint-disable */
  testFn.__onCacheGetter = () => {
    hookCallback?.cacheGetter()
  }

  testFn.__onSkipGetter = () => {
    hookCallback?.skipGetter()
  }

  testFn.__onCacheSetter = () => {
    hookCallback?.cacheSetter()
  }

  testFn.__onSkipSetter = () => {
    hookCallback?.skipSetter()
  }
  /* eslint-enable */
}
