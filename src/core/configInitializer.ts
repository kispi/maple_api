import { getOCID } from '../services/maple/__common'
import { skill } from '../services/maple/character'
import { log } from './logger'
import store from '../store'

// 항상 최신 이벤트가 적용된 상태를 유지하는 캐릭터들
const REFERENCE_CHARACTERS = ['아델', '강은호', 'bitcoin']

// 프론트엔드가 0차 스킬의 skill_effect에서 실제로 파싱하는 경험치 효과 문구.
// 공격력/보스/크리티컬 등은 상시 0차 스킬(고급 무기 제련, 컨티뉴어스 링 등)에도 붙어있어 기준이 될 수 없다.
const EXP_EFFECT_KEYWORDS = [
  '몬스터파크 퇴장 시 획득하는 경험치',
  '아케인리버 일일퀘스트 완료 시 획득 경험치',
  '그란디스 일일퀘스트 완료 시 획득 경험치',
]

const MAX_EVENT_NAMES = 10

const extractEventNames = (characterSkills: { skill_name: string, skill_effect: string }[]) => {
  return characterSkills
    .filter(s => {
      const effect = s.skill_effect || ''
      if (effect.includes('(Unknown)')) return false
      return EXP_EFFECT_KEYWORDS.some(kw => effect.includes(kw))
    })
    // 레벨 표기 제거 (e.g. "끝없는 축제 Lv.1" -> "끝없는 축제"). 프론트는 skill_name.includes(name)로 매칭한다
    .map(s => s.skill_name.replace(/\s*Lv\.?\s*\d+$/i, '').trim())
    .filter(name => name.length > 0 && name.length <= 64)
}

export const initializeEventConfig = async () => {
  log.info('Initializing dynamic event config...')

  const eventNames = new Set<string>()

  for (const name of REFERENCE_CHARACTERS) {
    try {
      const ocid = await getOCID(name)
      const skillsResp = await skill({ ocid, character_skill_grade: '0' })
      const characterSkills = skillsResp?.character_skill || []

      if (characterSkills.length === 0) {
        log.warn(`No 0th-grade skills found for character: ${name}`)
        continue
      }

      const extracted = extractEventNames(characterSkills)
      log.info(`Extracted event names from ${name}: ${JSON.stringify(extracted)}`)
      extracted.forEach(eventName => eventNames.add(eventName))
    } catch (err) {
      log.error(`Failed to load event config using character ${name}:`, err)
    }
  }

  if (eventNames.size === 0) {
    log.warn('Could not initialize event names from any reference characters.')
    return
  }

  store.state.eventNames = Array.from(eventNames).slice(0, MAX_EVENT_NAMES)
  log.info(`Initialized event names: ${JSON.stringify(store.state.eventNames)}`)
}
