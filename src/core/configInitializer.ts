import { getOCID } from '../services/maple/__common'
import { skill } from '../services/maple/character'
import { log } from './logger'
import store from '../store'

export const initializeEventConfig = async () => {
  const characters = ['아델', '강은호', 'bitcoin']

  log.info('Initializing dynamic event config...')

  for (const name of characters) {
    try {
      log.info(`Fetching OCID for character: ${name}`)
      const ocid = await getOCID(name)

      log.info(`Fetching 0th-grade skills for character: ${name}`)
      const skillsResp = await skill({ ocid, character_skill_grade: '0' })
      const characterSkills = skillsResp?.character_skill || []

      if (characterSkills.length === 0) {
        log.warn(`No 0th-grade skills found for character: ${name}`)
        continue
      }

      // Filter potential event skills
      const effectKeywords = [
        '공격력/마력', '보스 몬스터', '보스 공격', '보스 데미지',
        '크리티컬', '경험치', '몬스터파크', '일일퀘스트', '심볼', '솔 에르다'
      ]

      const potentialEvents = characterSkills
        .filter((s: { skill_effect: string }) => {
          const sEffect = s.skill_effect || ''

          if (sEffect.includes('(Unknown)')) {
            return false
          }

          return effectKeywords.some(kw => sEffect.includes(kw))
        })
        .map((s: { skill_name: string }) => s.skill_name)

      if (potentialEvents.length > 0) {
        // Remove level information (e.g. "끝없는 축제 Lv.1" -> "끝없는 축제")
        const cleanedEvents = Array.from(new Set(
          potentialEvents.map((sName: string) => sName.replace(/\s*Lv\.\d+/gi, '').trim())
        ))

        log.info(`Successfully extracted event names: ${JSON.stringify(cleanedEvents)}`)
        store.state.eventNames = cleanedEvents
        return
      }
    } catch (err) {
      log.error(`Failed to load event config using character ${name}:`, err)
    }
  }

  log.warn('Could not initialize event names from any target characters.')
}
