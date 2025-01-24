export type PetEquipment = {
  item_name: string
  item_icon: string
  item_description: string
  item_option: [{
    option_type: string
    option_value: string
  }]
  scroll_upgrade: number
  scroll_upgradeable: number
  item_shape: string
  item_shape_icon: string
}

export type PetAutoSkill = {
  skill_1: string
  skill_1_icon: string
  skill_2: string
  skill_2_icon: string
}

export type CharacterPetEquipment = {
  date: string
  pet_1_name: string
  pet_1_nickname: string
  pet_1_icon: string
  pet_1_description: string
  pet_1_equipment: PetEquipment
  pet_1_auto_skill: PetAutoSkill
  pet_1_pet_type: string
  pet_1_skill: string[]
  pet_1_date_expire: string
  pet_1_appearance: string
  pet_1_appearance_icon: string

  pet_2_name: string
  pet_2_nickname: string
  pet_2_icon: string
  pet_2_description: string
  pet_2_equipment: PetEquipment
  pet_2_auto_skill: PetAutoSkill
  pet_2_pet_type: string
  pet_2_skill: string[]
  pet_2_date_expire: string
  pet_2_appearance: string
  pet_2_appearance_icon: string

  pet_3_name: string
  pet_3_nickname: string
  pet_3_icon: string
  pet_3_description: string
  pet_3_equipment: PetEquipment
  pet_3_auto_skill: PetAutoSkill
  pet_3_pet_type: string
  pet_3_skill: string[]
  pet_3_date_expire: string
  pet_3_appearance: string
  pet_3_appearance_icon: string
}