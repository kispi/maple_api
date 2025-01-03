import Fastify from 'fastify'
import dotenv from 'dotenv'
import store from './store'
import controllers from './controllers'
import helpers from './core/helpers'
// import { createHttpLog, log } from './core/logger'

const loadEnv = () => {
  const env = dotenv.config().parsed || {}
  if (env.API_PORT) store.state.serverConfig.API_PORT = env.API_PORT
  if (env.API_KEY_NEXON) store.state.serverConfig.API_KEY_NEXON = env.API_KEY_NEXON
}

const app = Fastify()
app.addHook('onRequest', (req, res, next) => {
  (req as any)['$$startTime'] = helpers.now()
  next()
})
// app.addHook('onError', (req, res, error, next) => {
//   log.error('fastify onError hook:', error)
//   log.error(JSON.stringify(createHttpLog(req, res)))
//   next()
// })
app.get('/info', controllers.maple.getInfo)
app.get('/ping', () => {
  return { status: 'pong' }
})

const start = async () => {
  loadEnv()

  try {
    await app.listen({ port: parseInt(store.state.serverConfig.API_PORT) })
    // log.info(`Server is running on port ${store.state.serverConfig.API_PORT}`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

start()