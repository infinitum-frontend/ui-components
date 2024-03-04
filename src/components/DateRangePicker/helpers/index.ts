import { parseLocalDateString } from 'Utils/date'

/**
 * Функция для валидации того, является ли дата ДО больше даты ОТ
 * @param value format [0-9]{2}.[0-9]{2}.[0-9]{4}—[0-9]{2}.[0-9]{2}.[0-9]{4}
 */
export const validateFn = (value: string): boolean => {
  const [from, to] = value?.split('—').map((val) => {
    // если введен год не полностью, не сравниваем даты.
    // Является обработкой кейса, когда введена дата формата DD.MM.YY и она парсится js как DD.MM.19YY
    if (val.split('.')?.[2]?.length < 4) {
      return undefined
    }
    return parseLocalDateString(val)
  }) as [Date, Date]

  if (from && to) {
    return to.getTime() > from.getTime()
  }

  return true
}

export const formatterFn = (date: string): string => {
  const [from, to] = date
    .split('—')
    .map((val) => parseLocalDateString(val)) as [Date, Date]
  if (from.getFullYear() > to.getFullYear()) {
    to.setFullYear(from.getFullYear())
  }

  const strFrom = from.toLocaleDateString('ru-Ru')
  const strTo = to.toLocaleDateString('ru-Ru')

  return [strFrom, strTo].join('—')
}
