import { parseLocalDateString } from 'Utils/date'

export function normalizeDate(date: Date | undefined): Date | undefined {
  if (!date) {
    return undefined
  }
  const dateCopy = new Date(date)
  dateCopy.setHours(0, 0, 0, 0)
  return dateCopy
}

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
    return normalizeDate(parseLocalDateString(val))
  }) as [Date | undefined, Date | undefined]

  const [from, to] = dates
  const minDate = normalizeDate(min)
  const maxDate = normalizeDate(max)

  const isRangeInvalid = from && to && to <= from

  const isFromBeforeMin = from && minDate && from < minDate
  const isToAfterMax = to && maxDate && to > maxDate
  const isFromAfterMax = from && maxDate && from > maxDate

  return !(isRangeInvalid || isFromBeforeMin || isToAfterMax || isFromAfterMax)
}

/**
 * Форматирует дату с учетом ограничений min и max
 * @param date строка с датами
 * @param min минимальная дата
 * @param max максимальная дата
 */
export const formatterFn = (date: string, min?: Date, max?: Date): string => {
  let [from, to] = date
    .split('—')
    .map((val) => normalizeDate(parseLocalDateString(val))) as [Date, Date]

  if (from.getFullYear() > to.getFullYear()) {
    to.setFullYear(from.getFullYear())
  }

  const minDate = min ? normalizeDate(min) : undefined
  const maxDate = max ? normalizeDate(max) : undefined

  if (minDate) {
    if (from < minDate) from = new Date(minDate)
    if (to < minDate) to = new Date(minDate)
  }

  if (maxDate) {
    if (from > maxDate) from = new Date(maxDate)
    if (to > maxDate) to = new Date(maxDate)
  }

  const strFrom = from.toLocaleDateString('ru-Ru')
  const strTo = to.toLocaleDateString('ru-Ru')

  return [strFrom, strTo].join('—')
}
