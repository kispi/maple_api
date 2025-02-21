import { CharacterAbility } from '../../types/ability'
import { CharacterAndroidEquipment } from '../../types/android-equipment'
import { CharacterBasic } from '../../types/basic'
import { CharacterBeautyEquipment } from '../../types/beauty-equipment'
import { CharacterCashItemEquipment } from '../../types/cash-item-equipment'
import { CharacterDojang } from '../../types/dojang'
import { CharacterHyperStat } from '../../types/hyper-stat'
import { CharacterHexaMatrix, CharacterHexaMatrixStat } from '../../types/hexa-stat'
import { CharacterItemEquipment } from '../../types/item-equipment'
import { CharacterLinkSkill } from '../../types/link-skill'
import { CharacterPetEquipment } from '../../types/pet-equipment'
import { CharacterPopularity } from '../../types/popularity'
import { CharacterPropensity } from '../../types/propensity'
import { CharacterSetEffect } from '../../types/set-effect'
import { CharacterSkill } from '../../types/skill'
import { CharacterStat } from '../../types/stat'
import { CharacterSymbolEquipment } from '../../types/symbol-equipment'
import { client } from './__common'

export const ability = async ({ ocid, date }: { ocid: string, date?: string }) => {
  try {
    return await client().get('character/ability', { params: { ocid, date } }) as CharacterAbility
  } catch (e) {
    return Promise.reject(e)
  }
}

export const androidEquipment = async ({ ocid, date }: { ocid: string, date?: string }) => {
  try {
    return await client().get('character/android-equipment', { params: { ocid, date } }) as CharacterAndroidEquipment
  } catch (e) {
    return Promise.reject(e)
  }
}

export const basic = async ({ ocid, date }: { ocid: string, date?: string }) => {
  try {
    return await client().get('character/basic', { params: { ocid, date } }) as CharacterBasic
  } catch (e) {
    return Promise.reject(e)
  }
}

export const beautyEquipment = async ({ ocid, date }: { ocid: string, date?: string }) => {
  try {
    return await client().get('character/beauty-equipment', { params: { ocid, date } }) as CharacterBeautyEquipment
  } catch (e) {
    return Promise.reject(e)
  }
}

export const cashItemEquipment = async ({ ocid, date }: { ocid: string, date?: string }) => {
  try {
    return await client().get('character/cashitem-equipment', { params: { ocid, date } }) as CharacterCashItemEquipment
  } catch (e) {
    return Promise.reject(e)
  }
}

export const dojang = async ({ ocid, date }: { ocid: string, date?: string }) => {
  try {
    return await client().get('character/dojang', { params: { ocid, date } }) as CharacterDojang
  } catch (e) {
    return Promise.reject(e)
  }
}

export const hexaMatrix = async ({ ocid, date }: { ocid: string, date?: string }) => {
  try {
    return await client().get('character/hexamatrix', { params: { ocid, date } }) as CharacterHexaMatrix
  } catch (e) {
    return Promise.reject(e)
  }
}

export const hexaMatrixStat = async ({ ocid, date }: { ocid: string, date?: string }) => {
  try {
    return await client().get('character/hexamatrix-stat', { params: { ocid, date } }) as CharacterHexaMatrixStat
  } catch (e) {
    return Promise.reject(e)
  }
}

export const hyperStat = async ({ ocid, date }: { ocid: string, date?: string }) => {
  try {
    return await client().get('character/hyper-stat', { params: { ocid, date } }) as CharacterHyperStat
  } catch (e) {
    return Promise.reject(e)
  }
}

export const itemEquipment = async ({ ocid, date }: { ocid: string, date?: string }) => {
  try {
    return await client().get('character/item-equipment', { params: { ocid, date } }) as CharacterItemEquipment
  } catch (e) {
    return Promise.reject(e)
  }
}

export const linkSkill = async ({ ocid, date }: { ocid: string, date?: string }) => {
  try {
    return await client().get('character/link-skill', { params: { ocid, date } }) as CharacterLinkSkill
  } catch (e) {
    return Promise.reject(e)
  }
}

export const petEquipment = async ({ ocid, date }: { ocid: string, date?: string }) => {
  try {
    return await client().get('character/pet-equipment', { params: { ocid, date } }) as CharacterPetEquipment
  } catch (e) {
    return Promise.reject(e)
  }
}

export const popularity = async ({ ocid, date }: { ocid: string, date?: string }) => {
  try {
    return await client().get('character/popularity', { params: { ocid, date } }) as CharacterPopularity
  } catch (e) {
    return Promise.reject(e)
  }
}

export const propensity = async ({ ocid, date }: { ocid: string, date?: string }) => {
  try {
    return await client().get('character/propensity', { params: { ocid, date } }) as CharacterPropensity
  } catch (e) {
    return Promise.reject(e)
  }
}

export const setEffect = async ({ ocid, date }: { ocid: string, date?: string }) => {
  try {
    return await client().get('character/set-effect', { params: { ocid, date } }) as CharacterSetEffect
  } catch (e) {
    return Promise.reject(e)
  }
}

export const skill = async ({
  ocid,
  date,
  character_skill_grade,
}: {
  ocid: string,
  date?: string,
  character_skill_grade: string, // 0, 1, 1.5, 2, 2.5, 3, 4, hyperpassive, hyperactive, 5, 6
}) => {
  try {
    return await client().get('character/skill', { params: { ocid, date, character_skill_grade } }) as CharacterSkill
  } catch (e) {
    return Promise.reject(e)
  }
}

export const stat = async ({ ocid, date }: { ocid: string, date?: string }) => {
  try {
    return await client().get('character/stat', { params: { ocid, date } }) as CharacterStat
  } catch (e) {
    return Promise.reject(e)
  }
}

export const symbolEquipment = async ({ ocid, date }: { ocid: string, date?: string }) => {
  try {
    return await client().get('character/symbol-equipment', { params: { ocid, date } }) as CharacterSymbolEquipment
  } catch (e) {
    return Promise.reject(e)
  }
}