// Node

const {
  // wordbook,
  generatorFunc
} = require('../../lib/fibonacci')

try {
  console.log(generatorFunc(1000000))
} catch (e) {
  console.log(e.stack.split('\n')[0])
}
