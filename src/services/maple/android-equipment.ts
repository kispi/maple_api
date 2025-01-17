import { CharacterAndroidEquipment } from '../../types/android-equipment'
import { client } from './__common'

export const androidEquipment = async ({ ocid, date }: { ocid: string, date?: string }) => {
  try {
    return await client().get('character/android-equipment', { params: { ocid, date } }) as CharacterAndroidEquipment
  } catch (e) {
    return Promise.reject(e)
  }
}