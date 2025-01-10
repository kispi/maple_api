import { FastifyInstance } from 'fastify'
import controllers from './controllers'

export const useRoutes = (app: FastifyInstance) => {
  app.get('/maple/info', controllers.maple.getInfo)
  app.get('/maple/ping', () => {
    return { status: 'pong' }
  })
}