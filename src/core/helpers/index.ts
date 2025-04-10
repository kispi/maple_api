import { FastifyRequest } from 'fastify'
import dayjs from 'dayjs'
import axios from 'axios'
import store from '../../store'

const helpers = {
  dayjs,
  regex: {
    url: /\b(?:https?|ftp):\/\/[a-z0-9-+&@#/%?=~_|!:,.;]*[a-z0-9-+&@#/%=~_|]/gim,
    pseudoUrl: /(^|[^/])(www\.[\S]+(\b|$))/gim,
    email: /[\w.]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+/gim,
  },
  retrieveUrlFromString: (url: string) => ((url || '').match(helpers.regex.url) || [])[0],
  isImageUrl: (url: string) =>
    ['.png', '.jpeg', '.jpg', '.jfif', '.svg', '.bmp', '.webp', '.gif'].some(ext => (url || '').toLowerCase().endsWith(ext)),
  useCdn: (key: string) => `${store.state.serverConfig.AWS_S3_CDN}/${key}`,
  case: {
    pluralize: (str: string) => {
      if (str.endsWith('day')) return `${str}s`
      if (str.endsWith('way')) return `${str}s`
      if (str.endsWith('y')) return `${str.slice(0, -1)}ies`
      if (str.endsWith('s') || str.endsWith('h')) return `${str}es`

      return `${str}s`
    },
    toCapital: (str: string) => str.charAt(0).toUpperCase() + str.slice(1),
    toSnake: (str: string, delim?: string) => (str || '').replace(/[A-Z]/g, letter => `${delim || '_'}${letter.toLowerCase()}`),
    toCamel: (str: string) => str.replace(/([-_][a-z])/g, group => group.toUpperCase().replace('-', '').replace('_', '')),
  },
  realIP: (req: FastifyRequest) => (req.headers['ssr-proxy-from'] || req.headers['x-forwarded-for'] ||  req.socket.remoteAddress) as string,
  imageUrlToBlob: async (imageUrl: string) => {
    try {
      return await axios.get(imageUrl, {
        responseType: 'arraybuffer',
      })
    } catch (e) {
      return Promise.reject(e)
    }
  },
  imageUrlToBase64String: async (imageUrl: string) => {
    try {
      const data = await axios.get(imageUrl, {
        responseType: 'arraybuffer',
      })
      return Buffer.from(data as any).toString('base64')
    } catch (e) {
      return Promise.reject(e)
    }
  },
  parseHref: (content: string) => (content.match(/<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/) || [])[2],
  now: () => {
    const ts = process.hrtime()
    return (ts[0] * 1e3) + (ts[1] / 1e6)
  },
}

export default helpers