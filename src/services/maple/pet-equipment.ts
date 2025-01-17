import { CharacterPetEquipment } from '../../types/pet-equipment'
import { client } from './__common'

export const petEquipment = async ({ ocid, date }: { ocid: string, date?: string }) => {
  try {
    return await client().get('character/pet-equipment', { params: { ocid, date } }) as CharacterPetEquipment
  } catch (e) {
    return Promise.reject(e)
  }
}