export default o => JSON.stringify(o)

export const parse = str => {
  try {
    return JSON.parse(str)
  } catch (e) {
    // The `unedefined' is referred as invalid value
    return undefined
  }
}
