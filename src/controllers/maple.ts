import { FastifyReply, FastifyRequest } from 'fastify'
import {
  androidEquipment,
  basic,
  beautyEquipment,
  cashItemEquipment,
  dojang,
  hexaMatrix,
  hexaMatrixStat,
  hyperStat,
  itemEquipment,
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

  try {
    const ocid = await getOCID(characterName)
    const resp = await Promise.all([
      basic({ ocid }),
      itemEquipment({ ocid }),
      androidEquipment({ ocid }),
      beautyEquipment({ ocid }),
      cashItemEquipment({ ocid }),
      petEquipment({ ocid }),
      symbolEquipment({ ocid }),
      dojang({ ocid }),
      propensity({ ocid }),
      popularity({ ocid }),
      setEffect({ ocid }),
      union({ ocid }),
      unionRaider({ ocid }),
      stat({ ocid }),
      hyperStat({ ocid }),
      hexaMatrix({ ocid }),
      hexaMatrixStat({ ocid }),
      skill({ ocid }),
    ])
    const result = {
      basic: resp[0],
      itemEquipment: resp[1],
      androidEquipment: resp[2],
      beautyEquipment: resp[3],
      cashItemEquipment: resp[4],
      petEquipment: resp[5],
      symbolEquipment: resp[6],
      dojang: resp[7],
      propensity: resp[8],
      popularity: resp[9],
      setEffect: resp[10],
      union: resp[11],
      unionRaider: resp[12],
      stat: resp[13],
      hyperStat: resp[14],
      hexaMatrix: resp[15],
      hexaMatrixStat: resp[16],
      skill: resp[17],
    }
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