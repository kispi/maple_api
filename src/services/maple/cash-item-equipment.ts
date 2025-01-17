import { CharacterCashItemEquipment } from '../../types/cash-item-equipment'
import { client } from './__common'

export const cashItemEquipment = async ({ ocid, date }: { ocid: string, date?: string }) => {
  try {
    return await client().get('character/cashitem-equipment', { params: { ocid, date } }) as CharacterCashItemEquipment
  } catch (e) {
    return Promise.reject(e)
  }
}