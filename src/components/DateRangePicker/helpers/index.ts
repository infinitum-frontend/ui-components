import { parseLocalDateString } from 'Utils/date'

/**
 * Функция для валидации диапазона дат с учетом min и max
 * @param value format [0-9]{2}.[0-9]{2}.[0-9]{4}—[0-9]{2}.[0-9]{2}.[0-9]{4}
 * @param min минимальная допустимая дата
 * @param max максимальная допустимая дата
 */
export const validateFn = (value: string, min?: Date, max?: Date): boolean => {
  const dates = value?.split('—').map((val) => {
    if (val.split('.')?.[2]?.length < 4) {
      return undefined
    }
    return parseLocalDateString(val)
  }) as [Date | undefined, Date | undefined]

  const [from, to] = dates

  if (from && to && to.getTime() <= from.getTime()) {
    return false
  }

  if (min) {
    if (from && from.getTime() < min.getTime()) return false
    if (to && to.getTime() < min.getTime()) return false
  }

  if (max) {
    if (from && from.getTime() > max.getTime()) return false
    if (to && to.getTime() > max.getTime()) return false
  }

  return true
}

/**
 * Форматирует дату с учетом ограничений min и max
 * @param date строка с датами
 * @param min минимальная дата
 * @param max максимальная дата
 */
export const formatterFn = (date: string, min?: Date, max?: Date): string => {
  let [from, to] = date.split('—').map((val) => parseLocalDateString(val)) as [
    Date,
    Date
  ]

  if (from.getFullYear() > to.getFullYear()) {
    to.setFullYear(from.getFullYear())
  }

  if (min) {
    if (from.getTime() < min.getTime()) from = new Date(min)
    if (to.getTime() < min.getTime()) to = new Date(min)
  }

  if (max) {
    if (from.getTime() > max.getTime()) from = new Date(max)
    if (to.getTime() > max.getTime()) to = new Date(max)
  }

  const strFrom = from.toLocaleDateString('ru-Ru')
  const strTo = to.toLocaleDateString('ru-Ru')

  return [strFrom, strTo].join('—')
}
