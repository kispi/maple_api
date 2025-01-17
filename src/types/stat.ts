export type CharacterStat = {
  date: string
  character_class: string
  final_stat: [{
    stat_name: string
    stat_value: number
  }]
  remain_ap: number
}