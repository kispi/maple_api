import { createHttpLog, log } from './core/logger'
import { FastifyInstance } from 'fastify'
import dotenv from 'dotenv'
import store from './store'
import helpers from './core/helpers'

export const useEnv = () => {
  const env = dotenv.config().parsed || {}
  if (env.API_PORT) store.state.serverConfig.API_PORT = env.API_PORT
  if (env.API_KEY_NEXON) store.state.serverConfig.API_KEY_NEXON = env.API_KEY_NEXON
  if (env.USE_REDIS) store.state.serverConfig.USE_REDIS = env.USE_REDIS
}

export const useHooks = (app: FastifyInstance) => {
  app.addHook('onRequest', (req, res, next) => {
    (req as any)['$$startTime'] = helpers.now()
    next()
  })
  app.addHook('onResponse', (req, res, next) => {
    log.info(JSON.stringify(createHttpLog(req, res)))
    next()
  })
  app.addHook('onError', (req, res, error, next) => {
    log.error('fastify onError hook:', error)
    log.error(JSON.stringify(createHttpLog(req, res)))
    next()
  })
}