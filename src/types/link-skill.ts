export type LinkSkill = {
  skill_name: string
  skill_description: string
  skill_level: number
  skill_effect: string
  skill_effect_next?: string
  skill_icon: string
}

export type CharacterLinkSkill = {
  date: string
  character_class: string
  character_link_skill: LinkSkill[]
  character_link_skill_preset_1: LinkSkill[]
  character_link_skill_preset_2: LinkSkill[]
  character_link_skill_preset_3: LinkSkill[]
  character_owned_link_skill: LinkSkill
  character_owned_link_skill_preset_1: LinkSkill
  character_owned_link_skill_preset_2: LinkSkill
  character_owned_link_skill_preset_3: LinkSkill
}
