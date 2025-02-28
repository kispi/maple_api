import { classes } from '../../assets/constants'
import { AchievementRanking, DojangRanking, GuildRanking, OverallRanking, TheSeedRanking, UnionRanking } from '../../types/ranking'
import { client } from './__common'

// ex: 히어로 => '전사-히어로' 등 API가 지원하는 정확한 클래스명을 찾아 반환
const getClassName = (className: string) => classes.find((c) => c.includes(className))

export const rankingOverall = async ({
  ocid,
  date,
  world_name,
  world_type,
  class_name,
  page,
}: {
  ocid: string,
  date: string,
  world_name?: string, // 스카니아, 베라, 루나, 제니스, 크로아, 유니온, 엘리시움, 이노시스, 레드, 오로라, 아케인, 노바, 에오스, 핼리오스, 챌린저스, 챌린저스2, 챌린저스3, 챌린저스4
  world_type?: string, // 월드 타입 (0:일반, 1:에오스,핼리오스) (기본 값은 0이며, world_name 입력 시 미 반영)
  class_name?: string,
  page?: number,
}) => {
  try {
    return await client().get('ranking/overall', { params: {
      ocid,
      date,
      world_name,
      world_type,
      class: class_name ? getClassName(class_name) : null,
      page,
    } }) as OverallRanking
  } catch (e) {
    return Promise.reject(e)
  }
}

export const rankingUnion = async ({
  ocid,
  date,
  world_name,
  page,
}: {
  ocid?: string,
  date: string,
  world_name?: string,
  page?: number,
}) => {
  try {
    return await client().get('ranking/union', { params: { ocid, date, world_name, page } }) as UnionRanking
  } catch (e) {
    return Promise.reject(e)
  }
}

export const rankingGuild = async ({
  ocid,
  date,
  world_name,
  ranking_type,
  guild_name,
  page,
}: {
  ocid: string,
  date: string,
  world_name?: string,
  ranking_type: string, // 랭킹 타입 (0:주간 명성치, 1:플래그 레이스, 2:지하 수로)
  guild_name?: string,
  page?: number,
}) => {
  try {
    return await client().get('ranking/guild', { params: { ocid, date, world_name, ranking_type, guild_name, page } }) as GuildRanking
  } catch (e) {
    return Promise.reject(e)
  }
}

export const rankingDojang = async ({
  ocid,
  date,
  world_name,
  difficulty,
  class_name,
  page,
}: {
  ocid: string,
  date: string,
  world_name?: string,
  difficulty: number, // 0: 일반, 1: 통달
  class_name?: string,
  page?: number,
}) => {
  try {
    return await client().get('ranking/dojang', { params: {
      ocid,
      date,
      world_name,
      difficulty,
      class_name: class_name ? getClassName(class_name) : null,
      page,
    } }) as DojangRanking
  } catch (e) {
    return Promise.reject(e)
  }
}

export const rankingTheseed = async ({
  ocid,
  date,
  world_name,
  page,
}: {
  ocid: string,
  date: string,
  world_name?: string,
  page?: number,
}) => {
  try {
    return await client().get('ranking/theseed', { params: { ocid, date, world_name, page } }) as TheSeedRanking
  } catch (e) {
    return Promise.reject(e)
  }
}

export const rankingAchievement = async ({
  ocid,
  date,
  page,
}: {
  ocid: string,
  date: string,
  page?: number,
}) => {
  try {
    return await client().get('ranking/achievement', { params: { ocid, date, page } }) as AchievementRanking
  } catch (e) {
    return Promise.reject(e)
  }
}