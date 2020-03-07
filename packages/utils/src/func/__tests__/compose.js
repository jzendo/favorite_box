/* global describe, test, expect */

import { compose, composeAsync } from '../compose'

describe('compose', () => {
  test('arg number or type is not legal', () => {
    // Test no arguments
    expect(() => {
      compose()()
    }).toThrow()

    // Test illegal argument: number, number
    expect(() => {
      compose(1, 2)()
    }).toThrow()

    // Test illegal argument: string, boolean
    expect(() => {
      compose('Hello', true)()
    }).toThrow()

    // Test one argument: () => {}
    expect(() => {
      compose(() => {})()
    }).toThrow()

    // Test two argument: () => {}, boolean
    expect(() => {
      compose(() => {}, true)()
    }).toThrow()
  })

  test('composedFn.args', () => {
    const fn1 = () => {}
    const fn2 = () => {}
    const fn3 = () => {}

    const composedFn = compose(fn1, fn2, fn3)

    expect(composedFn.args.length).toEqual(3)
    expect(composedFn.args[0]).toEqual(fn1)
    expect(composedFn.args[1]).toEqual(fn2)
    expect(composedFn.args[2]).toEqual(fn3)
  })

  test('normal composed', () => {
    const arrChar = ['a', 'b', 'c']

    let result = ''
    const actual = arrChar.join('')

    const fn1 = () => {
      result += arrChar[0]
    }
    const fn2 = () => {
      result += arrChar[1]
    }
    const fn3 = () => {
      result += arrChar[2]
    }

    compose(fn1, fn2, fn3)()

    expect(result).toEqual(actual)
  })

  test('reverse composed', () => {
    const arrChar = ['a', 'b', 'c']

    let result = ''
    const actual = arrChar
      .slice(0)
      .reverse()
      .join('')

    const fn1 = () => {
      result += arrChar[0]
    }
    const fn2 = () => {
      result += arrChar[1]
    }
    const fn3 = () => {
      result += arrChar[2]
    }

    compose(fn1, fn2, fn3, true)()

    expect(result).toEqual(actual)
  })
})

describe('composeAsync', () => {
  test('arg number or type is not legal', () => {
    // Test no arguments
    expect(() => {
      composeAsync()()
    }).toThrow()

    // Test illegal argument: number, number
    expect(() => {
      composeAsync(1, 2)()
    }).toThrow()

    // Test illegal argument: string, boolean
    expect(() => {
      composeAsync('Hello', true)()
    }).toThrow()

    // Test one argument: () => {}
    expect(() => {
      composeAsync(() => {})()
    }).toThrow()

    // Test two argument: () => {}, boolean
    expect(() => {
      composeAsync(() => {}, true)()
    }).toThrow()
  })

  test('composedFn.args', () => {
    const fn1 = () => {}
    const fn2 = () => {}
    const fn3 = () => {}

    const composedFn = composeAsync(fn1, fn2, fn3)

    expect(composedFn.args.length).toEqual(3)
    expect(composedFn.args[0]).toEqual(fn1)
    expect(composedFn.args[1]).toEqual(fn2)
    expect(composedFn.args[2]).toEqual(fn3)
  })

  test('normal composed', done => {
    const arrChar = ['a', 'b', 'c']

    const actual = arrChar.join('')

    const fn1 = (v, next) => {
      v += arrChar[0]
      next(v)
    }
    const fn2 = (v, next) => {
      v += arrChar[1]
      next(v)
    }
    const fn3 = (v, next) => {
      v += arrChar[2]
      next(v)
    }

    composeAsync(
      fn1,
      fn2,
      fn3
    )('', result => {
      expect(result).toEqual(actual)
      done()
    })
  })

  test('normal composed with timeout', done => {
    const arrChar = ['a', 'b', 'c']

    const actual = arrChar.join('')

    const fn1 = (v, next) => {
      v += arrChar[0]
      setTimeout(() => next(v))
    }
    const fn2 = (v, next) => {
      v += arrChar[1]
      setTimeout(() => next(v))
    }
    const fn3 = (v, next) => {
      v += arrChar[2]
      setTimeout(() => next(v))
    }

    composeAsync(
      fn1,
      fn2,
      fn3
    )('', result => {
      expect(result).toEqual(actual)
      done()
    })
  })

  test('reverse composed', done => {
    const arrChar = ['a', 'b', 'c']

    const actual = arrChar
      .slice(0)
      .reverse()
      .join('')

    const fn1 = (v, next) => {
      v += arrChar[0]
      next(v)
    }
    const fn2 = (v, next) => {
      v += arrChar[1]
      next(v)
    }
    const fn3 = (v, next) => {
      v += arrChar[2]
      next(v)
    }

    composeAsync(
      fn1,
      fn2,
      fn3,
      true
    )('', result => {
      expect(result).toEqual(actual)
      done()
    })
  })

  test('reverse composed with timeout', done => {
    const arrChar = ['a', 'b', 'c']

    const actual = arrChar
      .slice(0)
      .reverse()
      .join('')

    const fn1 = (v, next) => {
      v += arrChar[0]
      setTimeout(() => next(v))
    }
    const fn2 = (v, next) => {
      v += arrChar[1]
      setTimeout(() => next(v))
    }
    const fn3 = (v, next) => {
      v += arrChar[2]
      setTimeout(() => next(v))
    }

    composeAsync(
      fn1,
      fn2,
      fn3,
      true
    )('', result => {
      expect(result).toEqual(actual)
      done()
    })
  })
})
