import { client } from './__common'

export type CharacterSetEffect = {
  date: string
  set_effect: [{
    set_name: string
    total_set_count: number
    set_effect_info: [{
      set_count: number
      set_option: string
    }]
    set_effect_full_info: [{
      set_count: number
      set_option: string
    }]
  }]
}

export const setEffect = async (ocid: string) => {
  try {
    return await client().get('character/set-effect', { params: { ocid } }) as CharacterSetEffect
  } catch (e) {
    return Promise.reject(e)
  }
}