export type OverallRanking = {
  ranking: {
    date: string
    ranking: number
    character_name: string
    world_name: string
    class_name: string
    sub_class_name: string
    character_level: number
    character_exp: number
    character_popularity: number
    character_guildname: string
  }[]
}

export type UnionRanking = {
  ranking: {
    date: string
    ranking: number
    character_name: string
    world_name: string
    class_name: string
    sub_class_name: string
    union_level: number
    union_power: number
  }[]
}

export type GuildRanking = {
  ranking: {
    date: string
    ranking: number
    guild_name: string
    world_name: string
    guild_level: number
    guild_master_name: string
    guild_mark: string
    guild_point: number
  }[]
}

export type DojangRanking = {
  ranking: {
    date: string
    ranking: number
    character_name: string
    world_name: string
    class_name: string
    sub_class_name: string
    character_level: number
    dojang_floor: number
    dojang_time_record: number
  }[]
}

export type TheSeedRanking = {
  ranking: {
    date: string
    ranking: number
    character_name: string
    world_name: string
    class_name: string
    sub_class_name: string
    character_level: number
    theseed_floor: number
    theseed_time_record: number
  }[]
}

export type AchievementRanking = {
  ranking: {
    date: string
    ranking: number
    character_name: string
    world_name: string
    class_name: string
    sub_class_name: string
    trophy_grade: string
    trophy_score: number
  }[]
}
