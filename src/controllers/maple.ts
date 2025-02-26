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
import { union, unionRaider } from '../services/maple/user'
import { getOCID } from '../services/maple/__common'
import { log } from '../core/logger'
import useCache from '../core/cache'

const getInfo = async (
  req: FastifyRequest<{ Querystring: { character_name: string } }>,
  reply: FastifyReply,
) => {
  const characterName = req.query['character_name']
  if (!characterName) {
    reply.status(400).send({ error: `Missing query param: 'character_name'` })
    return
  }

  const cache = useCache()
  const cached = await cache.get(`maple_ocid:${characterName}`)
  if (cached) {
    reply.send(cached)
    return
  }

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

    cache.set(`maple_ocid:${characterName}`, result, 60)
    log.info(`mapleController.getInfo: cached ${characterName} (${ocid}) for 60 seconds`)
    reply.send(result)
  } catch (e) {
    reply.status(400).send(e)
  }
}

export default {
  getInfo,
}