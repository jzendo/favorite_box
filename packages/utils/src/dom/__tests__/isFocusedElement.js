/**
 * @jest-environment jsdom
 */

/* global describe, test, expect */

import isFocusedElement from '../isFocusedElement'

describe('DOM isFocusedElement', () => {
  test('is valid', () => {
    let ele = document.createElement('input')
    document.body.appendChild(ele)

    expect(isFocusedElement(ele)).toBeFalsy()

    ele.focus()
    expect(isFocusedElement(ele)).toBeTruthy()

    document.body.removeChild(ele)
    ele = null
  })
})
