import { FastifyRequest } from 'fastify'

interface IAppResponse {
  asJSON: (json: unknown) => void
  asHTML: (html: string) => void
  failed: (payload?: string | unknown, code?: number) => void
  error: () => void,
  success: (json?: unknown) => void
}

export default interface IContext {
  req: FastifyRequest,
  res: IAppResponse,
}