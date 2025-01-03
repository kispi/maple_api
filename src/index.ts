import Fastify from 'fastify'
import dotenv from 'dotenv'
import store from './store'

Object.assign(store.server.config, dotenv.config().parsed)

const loadEnv = () => {
  const env = dotenv.config().parsed || {}
  if (env.API_PORT) store.server.config.API_PORT = env.API_PORT
  if (env.API_KEY_NEXON) store.server.config.API_KEY_NEXON = env['API_KEY']
}

const app = Fastify()

app.get('/', async (request, reply) => {
  return 'Hello there! 👋'
})

const start = async () => {
  loadEnv()
  try {
    await app.listen({ port: parseInt(store.server.config.API_PORT) })
    console.log(`Server is running on port ${store.server.config.API_PORT}`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

start()