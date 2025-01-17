import { CharacterItemEquipment } from '../../types/item-equipment'
import { client } from './__common'

export const itemEquipment = async ({ ocid, date }: { ocid: string, date?: string }) => {
  try {
    return await client().get('character/item-equipment', { params: { ocid, date } }) as CharacterItemEquipment
  } catch (e) {
    return Promise.reject(e)
  }
}