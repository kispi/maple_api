import { useDefinedError } from '../../assets/constants'
import axios, { Axios } from 'axios'
import store from '../../store'

// https://openapi.nexon.com/game/maplestory

let cachedClient: Axios

export const client = () => {
  if (cachedClient) return cachedClient

  cachedClient = axios.create({
    baseURL: 'https://open.api.nexon.com/maplestory/v1',
    headers: {
      'x-nxopen-api-key': store.state.serverConfig.API_KEY_NEXON,
    },
  })
  cachedClient.interceptors.response.use(resp => resp.data)
  return cachedClient
}

export const getOCID = async (name: string) => {
  try {
    const { ocid } = await client().get('id', {
      params: {
        character_name: name,
      },
    }) as { ocid: string }
    return ocid
  } catch (e) {
    return Promise.reject(useDefinedError('0001'))
  }
}