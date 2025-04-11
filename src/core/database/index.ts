/*
최초 데이터베이스 & 테이블 생성 쿼리

CREATE DATABASE IF NOT EXISTS `everymaple`
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `everymaple`;

CREATE TABLE IF NOT EXISTS `search_histories` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `ocid` VARCHAR(255) NOT NULL,
  `character_name` VARCHAR(255) NOT NULL,
  `raw_json` LONGTEXT NOT NULL,
  `ip` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_ocid` (`ocid`)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

*/

import { deflateSync, inflateSync } from 'zlib'
import { useDefinedError } from '../../assets/constants'
import { log } from '../logger'
import knex from 'knex'
import store from '../../store'

export type SearchHistory = {
  id: number
  ocid: string
  character_name: string
  raw_json: string
  ip: string
  created_at: string
}

// 그냥 JSON으로 저장하면 행 하나에 거의 500KiB라 도저히 감당이 안되는데 아래처럼 압축했더니 32KiB로 줄어들었음.
export const saveSearchHistory = async ({
  ocid,
  character_name,
  ip,
  result,
}: {
  ocid: string,
  character_name: string,
  ip: string,
  result: any,
}) => {
  const raw_json = deflateSync(Buffer.from(JSON.stringify(result)), { level: 9 }).toString('base64')
  try {
    await db<SearchHistory>('search_histories').insert({
      ocid,
      character_name,
      ip,
      raw_json,
    })
  } catch (e) {
    log.error(`Failed to save search history: ${e}`)
  }
}

// 당연히 사용할 떄는 압축을 풀어야 함 (ex: getSearchHistories({ character_name: 'coinsect' }))
export const getSearchHistories = async ({
  id,
  ocid,
  character_name,
  limit,
  page,
  orderBy = 'created_at',
  order = 'desc',
  raw,
}: {
  id?: number,
  ocid?: string,
  character_name?: string,
  limit?: number,
  page?: number,
  orderBy?: 'created_at' | 'id',
  order?: 'asc' | 'desc',
  raw?: boolean,
}) => {
  const query = db<SearchHistory>('search_histories').select('*')

  const defaults = {
    limit: 10,
    page: 1,
  }

  if (limit && (limit > store.state.serverConfig.MAX_SEARCH_HISTORY_LIMIT)) return Promise.reject(useDefinedError('0003'))

  if (id) {
    query.where('id', id)
  } else if (ocid) {
    query.where('ocid', ocid)
  } else if (character_name) {
    query.where('character_name', character_name)
  }

  const rows = await query
    .orderBy(orderBy, order)
    .limit(limit || defaults.limit)
    .offset(((page || defaults.page) - 1) * (limit || defaults.limit))
  return rows.map(({ raw_json, ...rest }) => ({
    ...rest,
    raw_json: raw ? raw_json : JSON.parse(
      inflateSync(Buffer.from(raw_json, 'base64')).toString()
    ),
  }))
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
