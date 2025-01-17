import { CharacterSymbolEquipment } from '../../types/symbol-equipment'
import { client } from './__common'

export const symbolEquipment = async ({ ocid, date }: { ocid: string, date?: string }) => {
  try {
    return await client().get('character/symbol-equipment', { params: { ocid, date } }) as CharacterSymbolEquipment
  } catch (e) {
    return Promise.reject(e)
  }
}