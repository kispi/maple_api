import { FastifyInstance } from 'fastify'
import controllers from './controllers'

export const useRoutes = (app: FastifyInstance) => {
  // 핸들러들은 반드시 무언가를 리턴해야 한다. 그냥 send로 끝내면 compression이 안 먹히는 듯?
  app.put('/admin/maintenance', controllers.admin.setMaintenance)
  app.get('/admin/search-histories', controllers.admin.searchHistories)

  app.get('/maple/info', controllers.maple.getInfo)
  app.get('/maple/ping', () => {
    return { status: 'pong' }
  })
  app.get('/config', () => {
    return { ver: '1.0.0' }
  })
}