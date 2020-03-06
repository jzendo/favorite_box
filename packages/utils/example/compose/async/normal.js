const composeAsync = require('../../../lib/func/compose').composeAsync

const fn1 = function (v, next) { next(v + '_fn1') }
const fn2 = function (v, next) { next(v + '_fn2') }
const fn3 = function (v, next) { next(v + '_fn3') }

const expected = 'fn0_fn1_fn2_fn3'

module.exports = function (callback) {
  const composedAsyncFn = composeAsync(fn1, fn2, fn3)
  composedAsyncFn('fn0', function (result) {
    callback(result, expected)
  })
}
