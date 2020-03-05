const objectProtoHasOwn = Object.prototype.hasOwnProperty

export default (obj, p) => {
  if (!obj || p === undefined) return false

  return objectProtoHasOwn.call(obj, p)
}
