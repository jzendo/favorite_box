import reduce from '../../common/reduce'

export const asyncComposed = fns => {
  const len = fns.length

  const next = (r, current, callback) => {
    let strategyNext

    // Go to next handler
    if (current < len - 1) {
      strategyNext = r => {
        next(r, current + 1, callback)
      }
    } else { // Finish
      strategyNext = r => {
        callback(r)
      }
    }

    fns[current](r, strategyNext)
  }

  return (initedValue, callback) => {
    next(initedValue, 0, callback)
  }
}

const reducer = (prev, fn) => (...args) => fn(prev(...args))
export const syncComposed = fns => reduce(fns, reducer)
