let uniqueFactorValue_ = 0

const joinWith_ = (prefix, id, suffix) => prefix + String(id) + suffix

export const genStrUniqueId = (prefix = '', suffix = '') => joinWith_(prefix, ++uniqueFactorValue_, suffix)

const EOF_VALUE = undefined

export default initFactory => (prefix = '', suffix = '') => {
  const {
    userGenerateStrUniqueId,
    getCurrent,
    onDispose
  } = initFactory({ prefix, suffix })

  let isEOF = false
  let current = (userGenerateStrUniqueId || genStrUniqueId)(prefix, suffix)

  const genUuid = () => {
    if (isEOF) return EOF_VALUE

    current = getCurrent({ prefix, suffix })
    return current
  }

  genUuid.current = () => current

  genUuid.dispose = () => {
    onDispose({ prefix, suffix })

    // Then reset and mark
    isEOF = true
    current = EOF_VALUE
  }

  genUuid.isEOF = () => isEOF === true

  // NOTE: only for test
  if (process.env.NODE_ENV === 'test') {
    genUuid.getUniqueFactorValue_ = () => uniqueFactorValue_
    genUuid.joinWith_ = joinWith_
  }

  return genUuid
}

const defaultPrefix = '__'
const defaultSuffix = '__'

export const buildDefaultUuid = (uuidByFactory) => {
  const uuid = uuidByFactory(defaultPrefix, defaultSuffix)
  uuid.prefix = defaultPrefix
  uuid.suffix = defaultSuffix

  return uuid
}
