import buildUuidFactory, {
  buildDefaultUuid,
  genStrUniqueId
} from './uniqueFactory'

function factory ({ prefix, suffix }) {
  let continueGotten = true

  const generateUuidIterable = function * () {
    while (true) {
      if (!continueGotten) break
      // Yield next uuid
      yield genStrUniqueId(prefix, suffix)
    }
  }

  const generateUuidIterator = generateUuidIterable()

  return {
    getCurrent () {
      return generateUuidIterator.next().value
    },
    onDispose () {
      // End generator func firstly
      continueGotten = false
      generateUuidIterator.next()
    }
  }
}

const uuidByGeneratorFactory = buildUuidFactory(factory)

export default uuidByGeneratorFactory

export const uuid = buildDefaultUuid(uuidByGeneratorFactory)
