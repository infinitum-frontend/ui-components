import dayjs from 'dayjs'
import isString from 'lodash/isString'

export const DateFormat = 'YYYY-MM-DD'
export const PresentationDateFormat = 'DD.MM.YYYY'
export const PresentationDateFormatWithDay = 'DD.MM.YYYY dddd'
export const PresentationDateFormatWithTime = 'DD.MM.YYYY, H:mm'

export const defaultDate = dayjs().format(DateFormat)

export function isDateFormat(date: unknown): boolean {
  const regex =
    // eslint-disable-next-line prefer-named-capture-group
    /^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2]\d|3[0-1])(T(?:[0-1]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+|)(?:Z|(?:\+|-)(?:\d{2}):?(?:\d{2}))?)?$/gm
  return (isString(date) && date.search(regex) !== -1) || false
}

export function isDateUtcFormat(dateUtc: unknown): boolean {
  const regex =
    /\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2]\d|3[0-1])T(?:[0-1]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+|)(?:Z|(?:\+|-)(?:\d{2}):?(?:\d{2}))/gm
  return (isString(dateUtc) && dateUtc.search(regex) !== -1) || false
}

export function getPeriodDate(options: {
  dateFrom: string | null
  dateTo: string | null
}): string {
  const { dateFrom, dateTo } = options

  if (dateFrom === null && dateTo !== null)
    return `до ${dayjs(dateTo).format(PresentationDateFormat)}`
  if (dateTo === null && dateFrom !== null)
    return `c ${dayjs(dateFrom).format(PresentationDateFormat)}`

  return `${dayjs(dateFrom).format(PresentationDateFormat)} — ${dayjs(
    dateTo
  ).format(PresentationDateFormat)}`
}

export function getPresentationDate(date: unknown): string {
  return isString(date) && (isDateFormat(date) || isDateUtcFormat(date))
    ? dayjs(date).format(PresentationDateFormat)
    : ''
}
export function getUrlDate(date: unknown): string {
  return isString(date) && (isDateFormat(date) || isDateUtcFormat(date))
    ? dayjs(date).format(DateFormat)
    : ''
}

export function getPresentationDateWithTime(date: unknown): string {
  return isString(date) && (isDateFormat(date) || isDateUtcFormat(date))
    ? dayjs(date).format(PresentationDateFormatWithTime)
    : ''
}

export function getAnywayValidDate(date: unknown): string {
  return isDateFormat(date) || isDateUtcFormat(date)
    ? (date as string)
    : defaultDate
}

export function sortDatesInAscendingOrder(
  date1: string,
  date2: string
): number {
  if (dayjs(date1) > dayjs(date2)) return 1
  if (dayjs(date1) < dayjs(date2)) return -1
  return 0
}

export function getDateWithAddedDays(
  startDate: string,
  daysNumber: number
): string {
  return dayjs(startDate).add(daysNumber, 'd').format(PresentationDateFormat)
}

export function getFirstAndLastDaysOfWeek(date: string): {
  firstDay: string
  lastDay: string
} {
  const firstDay = dayjs(date).startOf('week').format(DateFormat)
  const lastDay = dayjs(date).endOf('week').format(DateFormat)
  return { firstDay, lastDay }
}
