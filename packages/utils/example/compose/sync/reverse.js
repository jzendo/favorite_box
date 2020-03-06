const compose = require('../../../build_cjs/func/compose').compose

const fn1 = function (v) { return v + '_fn1' }
const fn2 = function (v) { return v + '_fn2' }
const fn3 = function (v) { return v + '_fn3' }

const expected = 'fn4_fn3_fn2_fn1'

module.exports = function () {
  const composedFn = compose(fn1, fn2, fn3, true)
  const result = composedFn('fn4')

  return [
    result,
    expected
  ]
}
