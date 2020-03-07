import buildUuidFactory, {
  buildDefaultUuid,
  genStrUniqueId
} from './uniqueFactory'

const ctor = () => {}

function getCurrent () {
  return genStrUniqueId()
}

// Auto-increasing
const getNext = () => {
  let i__ = 0
  return () => ++i__
}

function userGenerateStrUniqueId ({ prefix, suffix }) {
  // Insert `random string` for difference the default handler
  // - See `genStrUniqueId` method by file `uniqueFactory.js` for detail
  return `${prefix}f3av3#$${getNext()}*&&*2fd${suffix}`
}

function factory ({ prefix, suffix }) {
  return {
    getCurrent,
    onDispose: ctor,
    userGenerateStrUniqueId
  }
}

const uuidByClosureFactory = buildUuidFactory(factory)

export default uuidByClosureFactory

export const uuid = buildDefaultUuid(uuidByClosureFactory)
