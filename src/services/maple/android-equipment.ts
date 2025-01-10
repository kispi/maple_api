import { client } from './__common'

// AndroidSkin represents the skin attributes of the android
type AndroidSkin = {
  skin_name: string
  color_style: string
  hue: number
  saturation: number
  brightness: number
}

// AndroidHair represents the hair attributes of the android
type AndroidHair = {
  hair_name: string
  base_color: string
  mix_color: string
  mix_rate: string
}

// AndroidFace represents the face attributes of the android
type AndroidFace = {
  face_name: string
  base_color: string
  mix_color: string
  mix_rate: string
}

// AndroidCashItemOption represents the options for a cash item
type AndroidCashItemOption = {
  option_type: string
  option_value: string
}

// AndroidCashItemEquipment represents the cash item equipment attributes
type AndroidCashItemEquipment = {
  cash_item_equipment_part: string
  cash_item_equipment_slot: string
  cash_item_name: string
  cash_item_icon: string
  cash_item_description: string
  cash_item_option: AndroidCashItemOption[]
  date_expire: string
  date_option_expire: string
  cash_item_label: string
  cash_item_coloring_prism: {
    color_range: string
    hue: number
    saturation: number
    value: number
  }
  android_item_gender: string
}

type AndroidInfo = {
  date: string
  android_name: string
  android_nickname: string
  android_icon: string
  android_description: string
  android_hair: AndroidHair
  android_face: AndroidFace
  android_skin: AndroidSkin
  android_cash_item_equipment: AndroidCashItemEquipment[]
  android_ear_sensor_clip_flag: string
  android_gender: string
  android_grade: string
  android_non_humanoid_flag: string
  android_shop_usable_flag: string
  preset_no: number
}

type CharacterAndroidEquipment = AndroidInfo & {
  date: string
  android_preset_1: AndroidInfo
  android_preset_2: AndroidInfo
  android_preset_3: AndroidInfo
}

export const androidEquipment = async ({ ocid, date }: { ocid: string, date?: string }) => {
  try {
    return await client().get('character/android-equipment', { params: { ocid, date } }) as CharacterAndroidEquipment
  } catch (e) {
    return Promise.reject(e)
  }
}