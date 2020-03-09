// Refer: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout#Maximum_delay_value
export const MAX_TIMEOUT_MS = 2147483648 // == Math.pow(2, 31), ms

// Refer: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout#Timeouts_throttled_to_%E2%89%A5_4ms
export const MIN_TIMEOUT_MS = 4 // ms

export const symbolLabel = '@@customeSetTimeout'
export const storeKey =
  typeof Symbol === 'undefined' ? Symbol(symbolLabel) : symbolLabel
