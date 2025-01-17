import { CharacterSetEffect } from '../../types/set-effect'
import { client } from './__common'

export const setEffect = async ({ ocid, date }: { ocid: string, date?: string }) => {
  try {
    return await client().get('character/set-effect', { params: { ocid, date } }) as CharacterSetEffect
  } catch (e) {
    return Promise.reject(e)
  }
}