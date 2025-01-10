import { client } from './__common'

export type CharacterDojang = {
  date: string
  character_class: string
  world_name: string
  dojang_best_floor: number
  date_dojang_record: string
  dojang_best_time: number
}

export const dojang = async ({ ocid, date }: { ocid: string, date?: string }) => {
  try {
    return await client().get('character/dojang', { params: { ocid, date } }) as CharacterDojang
  } catch (e) {
    return Promise.reject(e)
  }
}