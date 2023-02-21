import { generateShowedDates, IWeekCalendarDay } from '../domain/Week.domain'

export const getWeekDates = async (options: {
  date: string
}): Promise<{ showedDates: IWeekCalendarDay[] }> =>
  await Promise.resolve({ showedDates: generateShowedDates(options.date) }) //
