export type CharacterAbility = {
  date: string
  ability_grade: string
  ability_info: [{
    ability_no: string
    ability_grade: string
    ability_value: string
  }]
  remain_fame: number
  preset_no: number
  ability_preset_1: {
    ability_preset_grade: string
    ability_info: [{
      ability_no: string
      ability_grade: string
      ability_value: string
    }]
  }
  ability_preset_2: {
    ability_preset_grade: string
    ability_info: [{
      ability_no: string
      ability_grade: string
      ability_value: string
    }]
  }
  ability_preset_3: {
    ability_preset_grade: string
    ability_info: [{
      ability_no: string
      ability_grade: string
      ability_value: string
    }]
  }
}