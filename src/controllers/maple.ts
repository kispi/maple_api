import { FastifyReply, FastifyRequest } from 'fastify'
import { itemEquipment } from '../services/maple/item-equipment'
import { androidEquipment } from '../services/maple/android-equipment'
import { petEquipment } from '../services/maple/pet-equipment'
import { dojang } from '../services/maple/dojang'
import { getOCID } from '../services/maple/__common'
import { basic } from '../services/maple/basic'
import useCache from '../core/cache'
import { log } from '../core/logger'

const getBasic = async (
  req: FastifyRequest<{ Querystring: { character_name: string } }>,
  reply: FastifyReply,
) => {
  const characterName = req.query['character_name']
  if (!characterName) {
    reply.status(400).send({ error: `Missing query param: 'character_name'` })
    return
  }

  try {
    const data = await basic({ ocid: await getOCID(characterName) })
    reply.send(data)
  } catch (e) {
    reply.status(400).send(e)
  }
}

const getItemEquipment = async (
  req: FastifyRequest<{ Querystring: { character_name: string } }>,
  reply: FastifyReply,
) => {
  const characterName = req.query['character_name']
  if (!characterName) {
    reply.status(400).send({ error: `Missing query param: 'character_name'` })
    return
  }

  try {
    const data = await itemEquipment({ ocid: await getOCID(characterName) })
    reply.send(data)
  } catch (e) {
    reply.status(400).send(e)
  }
}

const getAndroidEquipment = async (
  req: FastifyRequest<{ Querystring: { character_name: string } }>,
  reply: FastifyReply,
) => {
  const characterName = req.query['character_name']
  if (!characterName) {
    reply.status(400).send({ error: `Missing query param: 'character_name'` })
    return
  }

  try {
    const data = await androidEquipment({ ocid: await getOCID(characterName) })
    reply.send(data)
  } catch (e) {
    reply.status(400).send(e)
  }
}

const getPetEquipment = async (
  req: FastifyRequest<{ Querystring: { character_name: string } }>,
  reply: FastifyReply,
) => {
  const characterName = req.query['character_name']
  if (!characterName) {
    reply.status(400).send({ error: `Missing query param: 'character_name'` })
    return
  }

  try {
    const data = await petEquipment({ ocid: await getOCID(characterName) })
    reply.send(data)
  } catch (e) {
    reply.status(400).send(e)
  }
}

const getDojang = async (
  req: FastifyRequest<{ Querystring: { character_name: string } }>,
  reply: FastifyReply,
) => {
  const characterName = req.query['character_name']
  if (!characterName) {
    reply.status(400).send({ error: `Missing query param: 'character_name'` })
    return
  }

  try {
    const data = await dojang({ ocid: await getOCID(characterName) })
    reply.send(data)
  } catch (e) {
    reply.status(400).send(e)
  }
}

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
      petEquipment({ ocid }),
      dojang({ ocid }),
    ])
    const result = {
      basic: resp[0],
      itemEquipment: resp[1],
      androidEquipment: resp[2],
      petEquipment: resp[3],
      dojang: resp[4],
    }
    cache.set(`maple_ocid:${characterName}`, result, 60)
    log.info(`mapleController.getInfo: cached ${characterName} (${ocid}) for 60 seconds`)
    reply.send(result)
  } catch (e) {
    reply.status(400).send(e)
  }
}

export default {
  getBasic,
  getItemEquipment,
  getAndroidEquipment,
  getPetEquipment,
  getDojang,
  getInfo,
}