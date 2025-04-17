import { FastifyRequest } from 'fastify'
import store from '../store'

const admin = {
  setMaintenance: async (req: FastifyRequest) => {
    const { isMaintaining } = req.body as { isMaintaining: boolean }
    store.state.isMaintaining = isMaintaining
    return { success: true }
  },
}

export default admin