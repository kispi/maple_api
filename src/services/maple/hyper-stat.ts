import { CharacterHyperStat } from '../../types/hyper-stat'
import { client } from './__common'

export const hyperStat = async ({ ocid, date }: { ocid: string, date?: string }) => {
  try {
    return await client().get('character/hyper-stat', { params: { ocid, date } }) as CharacterHyperStat
  } catch (e) {
    return Promise.reject(e)
  }
}