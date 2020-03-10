import wordbook, { clearCache } from '../wordbook'
import fibonacciTestCase from './common/fibonacciTestCase'

fibonacciTestCase(wordbook, clearCache, 'wordbook')
