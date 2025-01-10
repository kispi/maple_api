import { log } from './core/logger'
import { useRoutes } from './routes'
import Fastify from 'fastify'
import store from './store'

import { useEnv, useHooks } from './server-modules'

const start = async () => {
  useEnv()

  const app = Fastify()
  useHooks(app)
  useRoutes(app)

  try {
    await app.listen({ port: parseInt(store.state.serverConfig.API_PORT) })
    log.info(`Server is running on port ${store.state.serverConfig.API_PORT}`)
  } catch (err) {
    log.error('Error starting server:', err)
    process.exit(1)
  }
}

start()