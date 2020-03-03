/* global describe, beforeEach, afterEach test, expect */

const stringify = o => JSON.stringify(o)

const testCase = (uuidFn, skipDispose, prefix = '', suffix = '') => {
  describe(`generate uuid factory with <prefix = ${
    stringify(prefix)
  }, suffix = ${
    stringify(suffix)
  }>`, () => {
    let makeUuid

    if (skipDispose) {
      makeUuid = uuidFn(prefix, suffix)
    } else {
      beforeEach(() => {
        makeUuid = uuidFn(prefix, suffix)
      })

      afterEach(() => {
        makeUuid.dispose()
        makeUuid = null
      })
    }

    test('default', () => {
      const id = makeUuid()
      expect(id).toEqual(makeUuid.current())

      const nextId = makeUuid()
      expect(nextId).not.toEqual(id)
      expect(nextId).toEqual(makeUuid.current())
    })

    test('prefix and suffix', () => {
      const id = makeUuid()
      const actual = makeUuid.joinWith_(prefix, makeUuid.getUniqueFactorValue_(), suffix)

      // Test prefix & suffix
      expect(id).toEqual(actual)

      // Test prefix
      if (prefix) {
        const hasPrefixed = id.indexOf(prefix) === 0
        expect(hasPrefixed).toBeTruthy()
      }

      // Test suffix
      if (suffix) {
        const hasSuffixed = id.lastIndexOf(suffix) === id.length - suffix.length
        expect(hasSuffixed).toBeTruthy()
      }
    })

    if (!skipDispose) {
      test('dispose & isEOF', () => {
        expect(makeUuid.isEOF()).toBeFalsy()
        makeUuid.dispose()
        expect(makeUuid.isEOF()).toBeTruthy()
      })
    }
  })
}

export default (generatorFunc, uuid) => {
  describe('generatorFunc', () => {
    const uuidFn = (prefix, suffix) => generatorFunc(prefix, suffix)
    testCase(uuidFn, false)
    testCase(uuidFn, false, 'AA_')
    testCase(uuidFn, false, undefined, '__BB')
  })

  describe('uuid util', () => {
    const uuidFn = () => uuid
    testCase(uuidFn, true, uuid.prefix, uuid.suffix)
    testCase(uuidFn, true, uuid.prefix, uuid.suffix)
    testCase(uuidFn, true, uuid.prefix, uuid.suffix)
  })
}
