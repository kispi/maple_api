import { CharacterBasic } from '../../types/basic'
import { client } from './__common'

export const basic = async ({ ocid, date }: { ocid: string, date?: string }) => {
  try {
    return await client().get('character/basic', { params: { ocid, date } }) as CharacterBasic
  } catch (e) {
    return Promise.reject(e)
  }
}