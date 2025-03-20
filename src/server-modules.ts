import { createHttpLog, log } from './core/logger'
import { FastifyInstance } from 'fastify'
import fastifyCompress from '@fastify/compress'
import fastifyCors from '@fastify/cors'
import dotenv from 'dotenv'
import store from './store'
import helpers from './core/helpers'

export const useEnv = () => {
  const env = dotenv.config().parsed || {}
  if (env.API_PORT) store.state.serverConfig.API_PORT = env.API_PORT
  if (env.API_KEY_NEXON) store.state.serverConfig.API_KEY_NEXON = env.API_KEY_NEXON
  if (env.USE_REDIS) store.state.serverConfig.USE_REDIS = env.USE_REDIS
}

export const useCompression = async (app: FastifyInstance) => {
  await app.register(fastifyCompress, {
    encodings: ['gzip', 'deflate'],
  })
}

export const useCors = (app: FastifyInstance) => {
  app.register(fastifyCors, {
    origin: (origin, cb) => {
      if (
        !origin || // 나중엔 삭제될 조건인데 일단 동일 서버에서 호출하는 경우도 허용해줌 (origin 없음)
        origin.includes('//localhost') ||
        origin.includes('everymaple.com')
      ) {
        cb(null, true)
        return
      }
      cb(new Error('Not allowed'), false)
    },
  })
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