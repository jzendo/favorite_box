// Node enviroment

// eslint-disable-next-line
!(function () {
  const [result, expected] = require('./normal')()

  console.log('\n---------------------- sync normal -----------------------')
  console.log(`\n Assert: result === expected ? ${result === expected}`)
  console.log(` -   result: ${result}`)
  console.log(` - expected: ${expected}`)
  console.log('\n--------------------------------------------------------')
}())

// eslint-disable-next-line
!(function () {
  const [result, expected] = require('./reverse')()

  console.log('\n---------------------- sync reverse -----------------------')
  console.log(`\n Assert: result === expected ? ${result === expected}`)
  console.log(` -   result: ${result}`)
  console.log(` - expected: ${expected}`)
  console.log('\n--------------------------------------------------------')
}())
