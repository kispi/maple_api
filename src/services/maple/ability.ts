import { CharacterAbility } from '../../types/ability'
import { client } from './__common'

export const ability = async ({ ocid, date }: { ocid: string, date?: string }) => {
  try {
    return await client().get('character/ability', { params: { ocid, date } }) as CharacterAbility
  } catch (e) {
    return Promise.reject(e)
  }
}