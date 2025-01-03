import { client } from './__common'

export type CharacterStat = {
  date: string
  character_class: string
  final_stat: [{
    stat_name: string
    stat_value: number
  }]
  remain_ap: number
}

export const stat = async (ocid: string) => {
  try {
    return await client().get('character/stat', { params: { ocid } }) as CharacterStat
  } catch (e) {
    return Promise.reject(e)
  }
}