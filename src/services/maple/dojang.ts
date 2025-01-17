import { CharacterDojang } from '../../types/dojang'
import { client } from './__common'

export const dojang = async ({ ocid, date }: { ocid: string, date?: string }) => {
  try {
    return await client().get('character/dojang', { params: { ocid, date } }) as CharacterDojang
  } catch (e) {
    return Promise.reject(e)
  }
}