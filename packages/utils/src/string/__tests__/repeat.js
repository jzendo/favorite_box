/* global describe, test, expect */

import repeat from '../repeat'

describe('repeat', () => {
  test('is valid', () => {
    // normal
    expect(repeat('a', 1)).toBe('a')
    expect(repeat('a', 2)).toBe('aa')
    expect(repeat('a', 3)).toBe('aaa')
    expect(repeat('a', 4)).toBe('aaaa')
    expect(repeat('a', 5)).toBe('aaaaa')
    expect(repeat('a', 7)).toBe('aaaaaaa')

    // Return empty string
    expect(repeat('a', 0)).toBe('')
    expect(repeat('a', -1)).toBe('')
    expect(repeat('a')).toBe('')
  })
})
