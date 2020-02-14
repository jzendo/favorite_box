/* global describe, test, expect */

import { checkIdentifier, checkFunctionParameter } from '../checkIdentifier'

describe('checkIdentifier', () => {
  test('is valid', () => {
    expect(checkIdentifier('a123')).toBeTruthy()
    expect(checkIdentifier('abc')).toBeTruthy()
  })

  test('is invalid', () => {
    expect(checkIdentifier('a 123')).toBeFalsy()
    expect(checkIdentifier('123')).toBeFalsy()
    expect(checkIdentifier(123)).toBeFalsy()
  })
})

describe('checkFunctionParameter', () => {
  test('is valid', () => {
    expect(checkFunctionParameter('a123')).toBeTruthy()
    expect(checkFunctionParameter('abc')).toBeTruthy()
    expect(checkFunctionParameter('a = 123')).toBeTruthy()
    expect(checkFunctionParameter('{...abc}')).toBeTruthy()
    expect(checkFunctionParameter('...abc')).toBeTruthy()
  })

  test('is invalid', () => {
    expect(checkFunctionParameter('a 123')).toBeFalsy()
    expect(checkFunctionParameter('123')).toBeFalsy()
    expect(checkFunctionParameter(123)).toBeFalsy()
    expect(checkFunctionParameter('{..abc}')).toBeFalsy()
    expect(checkFunctionParameter('.abc')).toBeFalsy()
  })
})
