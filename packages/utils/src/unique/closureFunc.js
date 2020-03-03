import buildUuidFactory, { buildDefaultUuid, genStrUniqueId } from './uniqueFactory'

const uuidByClosureFactory = buildUuidFactory(
  function factory ({ prefix, suffix }) {
    return {
      getCurrent () {
        return genStrUniqueId()
      },
      onDispose () { }
    }
  }
)

export default uuidByClosureFactory

export const uuid = buildDefaultUuid(uuidByClosureFactory)
