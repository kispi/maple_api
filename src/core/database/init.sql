/*
최초 데이터베이스 & 테이블 생성 쿼리
*/

CREATE DATABASE IF NOT EXISTS `everymaple`
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `everymaple`;

CREATE TABLE IF NOT EXISTS `characters` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `ocid` VARCHAR(255) NOT NULL,
  `character_name` VARCHAR(255) NOT NULL,
  `character_level` INT NOT NULL,
  `character_image` TEXT NOT NULL,
  `character_class` VARCHAR(255) NOT NULL,
  `world_name` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_ocid` (`ocid`),
  INDEX `idx_character_name` (`character_name`),
  INDEX `idx_character_class` (`character_class`),
  INDEX `idx_world_name` (`world_name`),
  INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

-- 트리거 생성
DELIMITER $$

DROP TRIGGER IF EXISTS `characters_before_update`$$

CREATE TRIGGER `characters_before_update`
BEFORE UPDATE ON `characters`
FOR EACH ROW
BEGIN
  SET NEW.updated_at = CURRENT_TIMESTAMP;
END$$

DELIMITER ;

CREATE TABLE IF NOT EXISTS `search_histories` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `character_id` BIGINT UNSIGNED NOT NULL,
  `raw_json` LONGTEXT NOT NULL,
  `ip` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_character_id` (`character_id`),
  CONSTRAINT `fk_character_id` FOREIGN KEY (`character_id`) REFERENCES `characters` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;