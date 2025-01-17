export type Union = {
  date: string
  union_level: number
  union_grade: string
  union_artifact_level: number
  union_artifact_exp: number
  union_artifact_point: number
}

export type UnionRaiderPreset = {
  union_raider_stat: string[]
  union_occupied_stat: string[]
  union_inner_stat: {
    stat_field_id: string
    stat_field_effect: string
  }[]
  union_block: {
    block_type: string
    block_class: string
    block_level: string
    block_control_point: {
      x: number
      y: number
    }
    block_position: {
      x: number
      y: number
    }[]
  }[]
}

export type UnionRaider = {
  date: string
  union_raider_stat: string[]
  union_occupied_stat: string[]
  union_inner_stat: {
    stat_field_id: string
    stat_field_effect: string
  }[]
  union_block: {
    block_type: string
    block_class: string
    block_level: string
    block_control_point: {
      x: number
      y: number
    }
    block_position: {
      x: number
      y: number
    }[]
  }[]
  use_preset_no: number
  union_raider_preset_1: UnionRaiderPreset
  union_raider_preset_2: UnionRaiderPreset
  union_raider_preset_3: UnionRaiderPreset
  union_raider_preset_4: UnionRaiderPreset
  union_raider_preset_5: UnionRaiderPreset
}