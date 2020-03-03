/**
 * Get the freezen object.
 * Inflenced by https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
 *
 * ```
 *   A frozen object can no longer be changed; freezing an object prevents new properties from being added to it,
 *   existing properties from being removed, prevents changing the enumerability, configurability,
 *   or writability of existing properties, and prevents the values of existing properties from being changed.
 *   In addition, freezing an object also prevents its prototype from being changed.
 *   freeze() returns the same object that was passed in.
 * ```
 *
 * NOTE: As `onlyShallowFreeze = false` is default,
 *       but you use `onlyShallowFreeze = true` as possible as can for performance
 * @param {Object} object the freezing object
 * @param {boolean} onlyShallowFreeze whether shallow freeze or not
 * @returns {Object} the freezen object
 */
export default function deepFreeze (object, onlyShallowFreeze = false) {
  if (!onlyShallowFreeze) {
    // Retrieve the property names defined on object
    var propNames = Object.getOwnPropertyNames(object)
    for (const name of propNames) {
      const value = object[name]
      if (value && typeof value === 'object') {
        deepFreeze(value)
      }
    }
  }

  return Object.freeze(object)
}
