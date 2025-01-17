import { Union, UnionRaider } from '../../types/union'
import { client } from './__common'

export const union = async ({ ocid, date }: { ocid: string, date?: string }) => {
  try {
    return await client().get('user/union', { params: { ocid, date } }) as Union
  } catch (e) {
    return Promise.reject(e)
  }
}

export const unionRaider = async ({ ocid, date }: { ocid: string, date?: string }) => {
  try {
    return await client().get('user/union-raider', { params: { ocid, date } }) as UnionRaider
  } catch (e) {
    return Promise.reject(e)
  }
}