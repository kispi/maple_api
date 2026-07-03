import { FastifyReply, FastifyRequest } from 'fastify'
import store from '../store'

const configController = {
  getConfig: async () => {
    return {
      eventNames: store.state.eventNames || [],
      isMaintaining: !!store.state.isMaintaining,
    }
  },

  setConfig: async (req: FastifyRequest, reply: FastifyReply) => {
    const { eventNames, isMaintaining } = req.body as { eventNames?: any, isMaintaining?: any }

    if (eventNames !== undefined) {
      if (!Array.isArray(eventNames)) {
        reply.status(400)
        return { error: 'eventNames must be an array of strings' }
      }

      if (eventNames.length > 10) {
        reply.status(400)
        return { error: 'Maximum of 10 event names allowed' }
      }

      for (const name of eventNames) {
        if (typeof name !== 'string') {
          reply.status(400)
          return { error: 'Each event name must be a string' }
        }
        if (name.length > 64) {
          reply.status(400)
          return { error: 'Event name length cannot exceed 64 characters' }
        }
      }
      store.state.eventNames = eventNames
    }

    if (isMaintaining !== undefined) {
      if (typeof isMaintaining !== 'boolean') {
        reply.status(400)
        return { error: 'isMaintaining must be a boolean' }
      }
      store.state.isMaintaining = isMaintaining
    }

    return {
      success: true,
      eventNames: store.state.eventNames,
      isMaintaining: store.state.isMaintaining,
    }
  },
}

export default configController
