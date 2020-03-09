// Fix max value problem, support it!
// Refer: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout

import setTimeout from './setTimeout'
import clearTimeout from './clearTimeout'

export default setTimeout

export { setTimeout, clearTimeout }
