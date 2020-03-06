import { asyncComposed, syncComposed } from './strategyIterate'
import composeWrapper from './composeWrapper'

/**
 * Generate the sync composed function
 *
 * @param {function} fn1 function to be composed
 * @param {?boolean} mayRunInReverseParam reverse or not
 * @returns {function} composed function
 */
const compose = composeWrapper(syncComposed)

/**
 * Generate the async composed function
 *
 * @param {function} fn1 function to be composed
 * @param {?boolean} mayRunInReverseParam reverse or not
 * @returns {function} composed function
 */
const composeAsync = composeWrapper(asyncComposed)

export default compose

export { compose, composeAsync }
