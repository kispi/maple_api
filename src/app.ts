import Fastify from 'fastify'

const app = Fastify({
  logger: { level: 'info' },
  trustProxy: true,
})

export default app