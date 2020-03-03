export default () => {
  let resolve
  let reject

  // eslint-disable-next-line
  const promise = new Promise((resolve_, reject_) => {
    resolve = resolve_
    reject = reject_
  })

  return {
    promise,
    resolve,
    reject
  }
}
