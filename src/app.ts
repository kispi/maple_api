import Fastify from 'fastify'

const app = Fastify({
  logger: { level: 'info' },
})

export default app