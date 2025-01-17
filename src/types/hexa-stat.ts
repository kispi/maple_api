export type CharacterHexaMatrix = {
  date: string
  character_hexa_core_equipment: [{
    hexa_core_name: string
    hexa_core_level: number
    hexa_core_type: string
    linked_skill: [{
      hexa_skill_id: string
    }]
  }]
}

export type CharacterHexaStatCore = {
  slot_id: string
  main_stat_name: string
  sub_stat_name_1: string
  sub_stat_name_2: string
  main_stat_level: number
  sub_stat_level_1: number
  sub_stat_level_2: number
  stat_grade: number
}

export type CharacterHexaMatrixStat = {
  date: string
  character_class: string
  character_hexa_stat_core: CharacterHexaStatCore[]
  character_hexa_stat_core_2: CharacterHexaStatCore[]
  preset_hexa_stat_core: CharacterHexaStatCore[]
  preset_hexa_stat_core_2: CharacterHexaStatCore[]
}