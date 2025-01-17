import { CharacterPropensity } from '../../types/propensity'
import { client } from './__common'

export const propensity = async ({ ocid, date }: { ocid: string, date?: string }) => {
  try {
    return await client().get('character/propensity', { params: { ocid, date } }) as CharacterPropensity
  } catch (e) {
    return Promise.reject(e)
  }
}