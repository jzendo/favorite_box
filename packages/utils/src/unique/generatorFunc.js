import buildUuidFactory, { buildDefaultUuid, genStrUniqueId } from './uniqueFactory'

const uuidByGeneratorFactory = buildUuidFactory(
  function factory ({ prefix, suffix }) {
    let continueGotten = true
    const generatorFunc = function * () {
      while (true) {
        if (!continueGotten) break
        // Yield next uuid
        yield genStrUniqueId(prefix, suffix)
      }
    }
    const iterator = generatorFunc()

    return {
      getCurrent () {
        return iterator.next().value
      },
      onDispose () {
        // End generator func firstly
        continueGotten = false
        iterator.next()
      }
    }
  }
)

export default uuidByGeneratorFactory

export const uuid = buildDefaultUuid(uuidByGeneratorFactory)
