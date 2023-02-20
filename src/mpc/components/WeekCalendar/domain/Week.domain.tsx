import dayjs from 'dayjs'
import { CurrentActivitiesEnum } from '../enums/currentActivities'

export interface IWeekCalendarDay {
  date: string
  isDayOff: boolean
}

export interface IWeekCalendarState {
  currentActivity: CurrentActivitiesEnum
  // chosenDate: string;
  // weekOfYear: number,
  showedDates: IWeekCalendarDay[]
}

const DateFormat = 'YYYY-MM-DD'

export function init(): IWeekCalendarState {
  // const TodayDate = dayjs().format(DateFormat);

  return {
    currentActivity: CurrentActivitiesEnum.bootstrap,
    // chosenDate: options?.chosenDate ?? TodayDate,
    // weekOfYear: -1,
    showedDates: []
  }
}

export function generateShowedDates(today: string): IWeekCalendarDay[] {
  const startOfWeek = dayjs(today).startOf('week')
  const days: IWeekCalendarDay[] = []

  for (let i = 0; i <= 6; i++) {
    days.push({
      date: startOfWeek.add(i, 'days').format(DateFormat),
      isDayOff: i >= 5
    })
  }

  return days
}

export function getPrevWeek(chosenDate: string): IWeekCalendarDay[] {
  const startOfPrevWeek = dayjs(chosenDate).subtract(1, 'week').startOf('week')

  return generateShowedDates(startOfPrevWeek.format(DateFormat))
}

export function getNextWeek(chosenDate: string): IWeekCalendarDay[] {
  const startOfPrevWeek = dayjs(chosenDate).add(1, 'week').startOf('week')

  return generateShowedDates(startOfPrevWeek.format(DateFormat))
}

export function canSeeNextWeek(day: string): boolean {
  return !dayjs(day).isSameOrAfter(dayjs(), 'week') // DEV-ONLY, wait backend
}
