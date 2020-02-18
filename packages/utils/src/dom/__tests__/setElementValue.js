/**
 * @jest-environment jsdom
 */

/* global describe, test, expect */

import setElementValue from '../setElementValue'

describe('DOM setValue', () => {
  test('is valid', () => {
    const expectedValue = '1'
    let ele = document.createElement('input')

    expect(() => {
      setElementValue(ele, expectedValue)
    }).not.toThrow()

    expect(ele.value).toEqual(expectedValue)

    let progressEle = document.createElement('progress')
    let hasException = false

    expect(() => {
      setElementValue(progressEle, Infinity, () => (hasException = true))
    }).not.toThrow()

    expect(hasException).toBeTruthy()

    ele = progressEle = null
  })
})
