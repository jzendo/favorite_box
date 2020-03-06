import isFunc from '../../common/isFunc'

export default function checkArgs (args) {
  const argCount = args.length

  if (argCount < 2) {
    throw new TypeError('The passed arguments should be two at least.')
  }

  for (let i = 0; i < argCount - 1; i++) {
    if (!isFunc(args[i])) {
      if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
        console.log(`Expect a function, but actual type=${typeof args[i]}, toString=${String(args[i])}.`)
      }

      throw new TypeError(`The ${i + 1}th arg should be a function.`)
    }
  }

  // Should all function when only two arguments
  if (argCount === 2 && !isFunc(args[argCount - 1])) {
    throw new TypeError('All should be functions when only two args.')
  }
}
