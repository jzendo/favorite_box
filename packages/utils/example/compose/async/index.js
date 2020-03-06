// Node enviroment

require('./normal')((result, expected) => {
  console.log('\n---------------------- async normal -----------------------')
  console.log(`\n Assert: result === expected ? ${result === expected}`)
  console.log(` -   result: ${result}`)
  console.log(` - expected: ${expected}`)
  console.log('\n--------------------------------------------------------')
})

require('./reverse')((result, expected) => {
  console.log('\n---------------------- async reverse -----------------------')
  console.log(`\n Assert: result === expected ? ${result === expected}`)
  console.log(` -   result: ${result}`)
  console.log(` - expected: ${expected}`)
  console.log('\n--------------------------------------------------------')
})
