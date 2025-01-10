import { client } from './__common'

export type CharacterBasic = {
  date: string
  character_name: string
  world_name: string
  character_gender: string
  character_class: string
  character_class_level: string
  character_level: number
  character_exp: number
  character_exp_rate: string
  character_guild_name: string
  character_image: string
  character_date_create: string
  access_flag: string
  liberation_quest_clear_flag: string
}

export const basic = async ({ ocid, date }: { ocid: string, date?: string }) => {
  try {
    return await client().get('character/basic', { params: { ocid, date } }) as CharacterBasic
  } catch (e) {
    return Promise.reject(e)
  }
}