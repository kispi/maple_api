import { client } from './__common'

export type CharacterPopularity = {
  date: string
  character_popularity: number
}

export const popularity = async ({ ocid, date }: { ocid: string, date?: string }) => {
  try {
    return await client().get('character/popularity', { params: { ocid, date } }) as CharacterPopularity
  } catch (e) {
    return Promise.reject(e)
  }
}