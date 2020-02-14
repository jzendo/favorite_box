/* global describe, test, expect */

import { checkExpression } from '../checkExpression'

describe('checkExpression', () => {
  test('is valid', () => {
    expect(checkExpression('a = 1')).toBeTruthy()
    expect(checkExpression('a += 1, b = 2')).toBeTruthy()
  })

  test('is invalid', () => {
    expect(checkExpression('const = 1')).toBeFalsy()
    expect(checkExpression('const += 1')).toBeFalsy()
  })
})
