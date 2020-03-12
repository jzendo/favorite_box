// Node

const {
  // wordbook,
  generatorFunc
} = require('../../lib/fibonacci')

try {
  console.log(generatorFunc(12312313))
} catch (e) {
  console.log(e.stack.split('\n')[0])
}
