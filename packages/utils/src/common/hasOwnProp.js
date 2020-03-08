const objectProtoHasOwn = Object.prototype.hasOwnProperty

export default function (obj, p) {
  if (arguments.length < 1) {
    // With raise exception
    return objectProtoHasOwn.call()
  }

  if (!obj || p === undefined) return false

  return objectProtoHasOwn.call(obj, p)
}
