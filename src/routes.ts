import { FastifyInstance } from 'fastify'
import controllers from './controllers'

export const useRoutes = (app: FastifyInstance) => {
  app.get('/maple/info', controllers.maple.getInfo)
  app.get('/maple/ping', () => ({ status: 'pong' }))
  app.get('/config', controllers.config.getConfig)
  app.post('/config', controllers.config.setConfig)
}