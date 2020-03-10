import fibonacci, { clearCache } from '../generatorFunc'
import fibonacciTestCase from './common/fibonacciTestCase'

fibonacciTestCase(fibonacci, clearCache, 'generator function')
