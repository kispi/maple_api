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
  `raw_json` JSON,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_ocid` (`ocid`)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

*/

import knex from 'knex'
import store from '../../store'

export type SearchHistory = {
  id: number
  ocid: string
  character_name: string
  raw_json: string
  created_at: string
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
