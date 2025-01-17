import { CharacterBeautyEquipment } from '../../types/beauty-equipment'
import { client } from './__common'

export const beautyEquipment = async ({ ocid, date }: { ocid: string, date?: string }) => {
  try {
    return await client().get('character/beauty-equipment', { params: { ocid, date } }) as CharacterBeautyEquipment
  } catch (e) {
    return Promise.reject(e)
  }
}