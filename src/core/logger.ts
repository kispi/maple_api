import { FastifyReply, FastifyRequest } from 'fastify'
import helpers from './helpers'

export const createLogger = () => {
  return {
    info: (...args: any[]) => console.log(`[${helpers.dayjs().format()}]`, ...args),
    debug: (...args: any[]) => console.info(`[${helpers.dayjs().format()}]`, ...args),
    error: (...args: any[]) => console.error(`[${helpers.dayjs().format()}]`, ...args),
    warn: (...args: any[]) => console.warn(`[${helpers.dayjs().format()}]`, ...args),
  }
}

export const createHttpLog = (req: FastifyRequest, res: FastifyReply): {
  method?: string,
  url?: string,
  status?: number,
  ms?: number,
  ip?: string | string[],
  userAgent: string,
} => {
  const log = {
    method: req.method,
    url: req.url,
    status: (res || {}).statusCode,
    ms: Math.round(100 * (helpers.now() - (req as any)['$$startTime'])) / 100,
    ip: helpers.realIP(req),
    userAgent: req.headers['user-agent'] || '',
  }

  if (req.headers['is-ssr']) (log as any)['is-ssr'] = true

  return log
}

export const log = createLogger()

export default {
  log,
  createLogger,
  createHttpLog,
}