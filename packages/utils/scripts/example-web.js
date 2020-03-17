const open = require('open')
const portfinder = require('portfinder')
const httpServer = require('http-server')
const colors = require('colors/safe')

const defer = () => {
  let resolve
  let reject

  // eslint-disable-next-line promise/param-names
  const promise = new Promise((resolve_, reject_) => {
    resolve = resolve_
    reject = reject_
  })

  return { resolve, reject, promise }
}

const MAX_PORT = 6666

const getPort = async (startPort = 1234) => {
  try {
    const port = portfinder.getPortPromise({
      port: startPort, // minimum port
      stopPort: MAX_PORT // maximum port
    })

    return port
  } catch (err) {
    if (startPort === MAX_PORT) throw err
    return getPort(startPort + 1)
  }
}

const chromeAppMap = {
  darwin: 'google chrome',
  linux: 'google-chrome',
  win32: 'chrome'
}

const openBrowser = async (server, url) => {
  // Try chrome
  try {
    const chromeApp = chromeAppMap[process.platform]
    if (!chromeApp) throw new Error('invalid chrome configuration for platform')

    await open(url, { app: [chromeApp, '--incognito'], wait: true })
  } catch (e) {
    console.log(colors.red('The example requires chrome browser.'))
  }

  // Windows will be failure that not apply `wait` effect
  // await open(url, { wait: true })

  server.close()
  process.exit()
}

// Bootstrap
;(async () => {
  const port = await getPort()
  const url = `http://localhost:${port}/example/web/`

  console.log(colors.yellow(`Auto open: ${url} ...`))

  const { resolve, promise } = defer()
  const server = httpServer.createServer({
    root: '.',
    logFn: () => {}
  })

  server.listen(port, '0.0.0.0', resolve)

  // Resolved after server listening already.
  await promise
  await openBrowser(server, url)
})()
