/* global describe, test, expect */

import repeat from '../repeat'

describe('repeat', () => {
  test('is valid', () => {
    // normal
    expect(repeat('a', 5)).toBe('aaaaa')
    expect(repeat('a', 1)).toBe('a')

    // Return empty string
    expect(repeat('a', 0)).toBe('')
    expect(repeat('a', -1)).toBe('')
    expect(repeat('a')).toBe('')
  })
})
