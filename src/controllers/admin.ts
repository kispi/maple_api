import { FastifyReply, FastifyRequest } from 'fastify'
import { getSearchHistories } from '../core/database'
import store from '../store'

const admin = {
  setMaintenance: async (req: FastifyRequest) => {
    const { isMaintaining } = req.body as { isMaintaining: boolean }
    store.state.isMaintaining = isMaintaining
    return { success: true }
  },
  // auth를 걸든지 해야 할 듯
  searchHistories: async (req: FastifyRequest, reply: FastifyReply) => {
    const { id, ocid, character_name, page, limit, orderBy, order } = req.query as {
      id?: number
      ocid?: string
      character_name?: string
      limit?: number
      page?: number
      orderBy?: 'created_at' | 'id'
      order?: 'asc' | 'desc'
    }
    try {
      const histories = await getSearchHistories({
        id, ocid, character_name, limit, page, orderBy, order,
      })
      return { success: true, data: histories }
    } catch (e) {
      reply.status(400)
      return e
    }
  },
}

export default admin