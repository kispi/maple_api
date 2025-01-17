import { CharacterStat } from '../../types/stat'
import { client } from './__common'

export const stat = async ({ ocid, date }: { ocid: string, date?: string }) => {
  try {
    return await client().get('character/stat', { params: { ocid, date } }) as CharacterStat
  } catch (e) {
    return Promise.reject(e)
  }
}