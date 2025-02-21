import { Union, UnionArtifact, UnionChampion, UnionRaider } from '../../types/union'
import { client } from './__common'

export const union = async ({ ocid, date }: { ocid: string, date?: string }) => {
  try {
    return await client().get('user/union', { params: { ocid, date } }) as Union
  } catch (e) {
    return Promise.reject(e)
  }
}

export const unionRaider = async ({ ocid, date }: { ocid: string, date?: string }) => {
  try {
    return await client().get('user/union-raider', { params: { ocid, date } }) as UnionRaider
  } catch (e) {
    return Promise.reject(e)
  }
}

export const unionArtifact = async ({ ocid, date }: { ocid: string, date?: string }) => {
  try {
    return await client().get('user/union-artifact', { params: { ocid, date } }) as UnionArtifact
  } catch (e) {
    return Promise.reject(e)
  }
}

export const unionChampion = async ({ ocid, date }: { ocid: string, date?: string }) => {
  try {
    return await client().get('user/union-champion', { params: { ocid, date } }) as UnionChampion
  } catch (e) {
    return Promise.reject(e)
  }
}