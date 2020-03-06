const compose = require('../../../lib/func/compose').compose

const fn1 = function (v) { return v + '_fn1' }
const fn2 = function (v) { return v + '_fn2' }
const fn3 = function (v) { return v + '_fn3' }

const expected = 'fn0_fn1_fn2_fn3'

module.exports = function () {
  const composedFn = compose(fn1, fn2, fn3)
  const result = composedFn('fn0')

  return [
    result,
    expected
  ]
}
