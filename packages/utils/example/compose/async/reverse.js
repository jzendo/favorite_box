const composeAsync = require('../../../build_cjs/func/compose').composeAsync

const fn1 = function (v, next) { next(v + '_fn1') }
const fn2 = function (v, next) { next(v + '_fn2') }
const fn3 = function (v, next) { next(v + '_fn3') }

const expected = 'fn4_fn3_fn2_fn1'

module.exports = function (callback) {
  const composedAsyncFn = composeAsync(fn1, fn2, fn3, true)
  composedAsyncFn('fn4', function (result) {
    callback(result, expected)
  })
}
