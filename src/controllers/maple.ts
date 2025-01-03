import { FastifyReply, FastifyRequest } from 'fastify'
import { itemEquipment } from '../services/maple/item-equipment'
import { androidEquipment } from '../services/maple/android-equipment'
import { petEquipment } from '../services/maple/pet-equipment'
import { dojang } from '../services/maple/dojang'
import { getOCID } from '../services/maple/__common'
import { basic } from '../services/maple/basic'

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
    const data = await basic(await getOCID(characterName))
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
    const data = await itemEquipment(await getOCID(characterName))
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
    const data = await androidEquipment(await getOCID(characterName))
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
    const data = await petEquipment(await getOCID(characterName))
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
    const data = await dojang(await getOCID(characterName))
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

  try {
    const ocid = await getOCID(characterName)
    const resp = await Promise.all([
      basic(ocid),
      itemEquipment(ocid),
      androidEquipment(ocid),
      petEquipment(ocid),
      dojang(ocid),
    ])
    reply.send(resp)
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