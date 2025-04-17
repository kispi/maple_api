import { CharacterBasic } from '../../types/basic'
import { deflateSync } from 'zlib'
import { log } from '../logger'
import knex from 'knex'
import store from '../../store'

// 최신 캐릭터 정보
export type Character = {
  id: number
  ocid: string
  character_name: string
  character_level: number
  character_image: string
  character_class: string
  world_name: string
  created_at: string
  updated_at: string
  deleted_at?: string
}

export type SearchHistory = {
  id: number
  character?: Character
  character_id: number
  raw_json: string
  ip: string
  created_at: string
}

// deflateSync를 하면 JSON 압축률이 매우 좋음
export const saveSearchHistory = async ({
  ocid,
  ip,
  result,
}: {
  ocid: string
  ip: string
  result: { basic: CharacterBasic }
}) => {
  try {
    const existing = await db<Character>('characters')
      .where({ ocid })
      .first()

    const { character_name, character_level, character_image, character_class, world_name } = result.basic
    if (existing) {
      await db<Character>('characters')
        .where({ ocid })
        .update({ character_name, character_level, character_image, character_class, world_name })
    } else {
      await db<Character>('characters').insert({ ocid, character_name, character_level, character_image, character_class, world_name })
    }

    // 캐릭터 ID 가져오기
    const character = await db<Character>('characters')
      .where({ ocid })
      .select('id')
      .first()
    if (!character) {
      log.error(`Failed to find character_id for ocid: ${ocid}`)
      return
    }

    // 검색 히스토리 저장
    await db<SearchHistory>('search_histories').insert({
      character_id: character.id,
      ip,
      raw_json: deflateSync(
        Buffer.from(JSON.stringify(result)),
        { level: 9 }
      ).toString('base64'),
    })
  } catch (e) {
    log.error(`Failed to save search history: ${e}`)
  }
}

export const getCharacter = async (ocid: string): Promise<Character | undefined> => {
  try {
    return await db<Character>('characters')
      .where({ ocid })
      .first()
  } catch (e) {
    return Promise.reject(e)
  }
}

export let db: knex.Knex<any, unknown[]>

export const useDatabase = () => {
  const connection = {
    host: store.state.serverConfig.DB_HOST,
    port: parseInt(store.state.serverConfig.DB_PORT),
    user: store.state.serverConfig.DB_USER,
    password: store.state.serverConfig.DB_PASSWORD,
    database: 'everymaple',
  }

  if (db) return db

  db = knex({ client: 'mysql2', connection })
  return db
}
