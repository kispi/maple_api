import { log } from './core/logger'
import { useRoutes } from './routes'
import { useCompression, useCors, useEnv, useHooks } from './server-modules'
import { useDatabase } from './core/database'
import Fastify from 'fastify'
import store from './store'

const start = async () => {
  useEnv()
  useDatabase()

  const app = Fastify()
  await useCompression(app)
  useCors(app)
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