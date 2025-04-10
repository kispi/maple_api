import { FastifyReply, FastifyRequest } from 'fastify'
import {
  androidEquipment,
  ability,
  basic,
  beautyEquipment,
  cashItemEquipment,
  dojang,
  hexaMatrix,
  hexaMatrixStat,
  hyperStat,
  itemEquipment,
  linkSkill,
  petEquipment,
  popularity,
  propensity,
  setEffect,
  skill,
  stat,
  symbolEquipment,
} from '../services/maple/character'
import { definedErrors } from '../assets/constants'
import { union, unionRaider, unionArtifact, unionChampion } from '../services/maple/user'
import { rankingOverall, rankingUnion } from '../services/maple/ranking'
import { getOCID } from '../services/maple/__common'
import { log } from '../core/logger'
import { saveSearchHistory } from '../core/database'
import useCache from '../core/cache'
import helpers from '../core/helpers'
import store from '../store'

const getInfo = async (
  req: FastifyRequest<{ Querystring: { character_name: string } }>,
  reply: FastifyReply,
) => {
  const characterName = req.query['character_name']
  if (!characterName) {
    reply.status(400)
    return { error: `Missing query param: 'character_name'` }
  }

  const cache = useCache()
  const cached = await cache.get(`maple_ocid:${characterName}`)
  if (cached) return cached

  const foos = {
    ability,
    basic,
    popularity,
    stat,
    hyperStat,
    propensity,
    itemEquipment,
    cashItemEquipment,
    symbolEquipment,
    setEffect,
    beautyEquipment,
    androidEquipment,
    petEquipment,
    linkSkill,
    hexaMatrix,
    hexaMatrixStat,
    dojang,
    union,
    unionRaider,
    unionArtifact,
    unionChampion,
  }

  try {
    const ocid = await getOCID(characterName)
    const entries = await Promise.all(Object.entries(foos).map(async ([key, foo]) => [key, await foo({ ocid })]))
    const result = Object.fromEntries(entries)
    
    // 스킬은 호출 오버로드가 달라서 따로 처리
    const skillsResp = await Promise.all([
      skill({ ocid, character_skill_grade: '0'}),
      skill({ ocid, character_skill_grade: '6'}),
    ])
    result.skills = [skillsResp[0], skillsResp[1]]

    const date = helpers.dayjs().format('YYYY-MM-DD')
    const rankingResp = await Promise.all([
      rankingOverall({ ocid, date }),
      rankingOverall({ ocid, date, world_name: result.basic.world_name }),
      rankingOverall({ ocid, date, class_name: result.basic.character_class }),
      rankingOverall({ ocid, date, class_name: result.basic.character_class, world_name: result.basic.world_name }),
      rankingUnion({ ocid, date }),
      rankingUnion({ ocid, date, world_name: result.basic.world_name }),
    ])

    result.ranking = {
      overall: rankingResp[0]?.ranking[0],
      overall_world: rankingResp[1]?.ranking[0],
      class: rankingResp[2]?.ranking[0],
      class_world: rankingResp[3]?.ranking[0],
      union: rankingResp[4]?.ranking[0],
      union_world: rankingResp[5]?.ranking[0],
    }

    cache.set(`maple_ocid:${characterName}`, result, 60)
    log.info(`mapleController.getInfo: cached ${characterName} (${ocid}) for 60 seconds`)

    saveSearchHistory({ ocid, character_name: characterName, result })
    return result
  } catch (e) {
    reply.status(400)
    if (store.state.isMaintaining) return definedErrors.find(err => err.message === 'SERVER_MAINTENANCE')

    return e
  }
}

export default {
  getInfo,
}