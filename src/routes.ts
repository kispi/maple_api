import { FastifyInstance } from 'fastify'
import controllers from './controllers'

export const useRoutes = (app: FastifyInstance) => {
  app.get('/info', controllers.maple.getInfo)
  app.get('/ping', () => {
    return { status: 'pong' }
  })
}