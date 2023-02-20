import dayjs from 'dayjs'

export const DateFormat = 'YYYY-MM-DD'
export const DaysInWeek = 7

export const DaysOfWeek: string[] = Array(DaysInWeek)
  .fill('')
  .map((_, index) => dayjs().weekday(index).format('dd'))

export function getMonthDays(date: string): string[] {
  const prevMonthDates: string[] = Array(dayjs(date).date(1).weekday())
    .fill('')
    .map((_, index) =>
      dayjs(date)
        .date(1)
        .subtract(index + 1, 'days')
        .format(DateFormat)
    )
    .reverse()

  const currentMonthDates: string[] = Array(dayjs(date).endOf('month').date())
    .fill('')
    .map((_, index) =>
      dayjs(date)
        .date(index + 1)
        .format(DateFormat)
    )

  const nextMonthDates: string[] = Array(
    DaysInWeek - (dayjs(date).endOf('month').weekday() + 1)
  )
    .fill('')
    .map((_, index) =>
      dayjs(date)
        .endOf('month')
        .add(index + 1, 'days')
        .format(DateFormat)
    )
  return [...prevMonthDates, ...currentMonthDates, ...nextMonthDates]
}

export function sliceByWeek(dates: string[]): string[][] {
  const sliced = []
  const overallWeeks = Math.ceil(dates.length / DaysInWeek)

  for (let week = 0; week <= overallWeeks - 1; week++) {
    sliced.push(dates.slice(week * DaysInWeek, week * DaysInWeek + DaysInWeek))
  }
  return sliced
}
