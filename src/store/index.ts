export default {
  state: {
    isMaintaining: false,
    eventNames: [] as string[],
    serverConfig: {
      API_PORT: '4500',
      API_KEY_NEXON: '',
      AWS_S3_CDN: '',
      USE_REDIS: 'no',
      DB_HOST: '',
      DB_PORT: '',
      DB_USER: '',
      DB_PASSWORD: '',
      JWT_SECRET: '',
      MAX_SEARCH_HISTORY_LIMIT: 20,
    },
  },
}