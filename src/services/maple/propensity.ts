import { client } from './__common'

export type CharacterPropensity = {
  date: string
  chariasma_level: number
  sensibility_level: number
  insight_level: number
  willingness_level: number
  handicraft_level: number
  charm_level: number
}

export const propensity = async ({ ocid, date }: { ocid: string, date?: string }) => {
  try {
    return await client().get('character/propensity', { params: { ocid, date } }) as CharacterPropensity
  } catch (e) {
    return Promise.reject(e)
  }
}