import dayjs from 'dayjs'
import React from 'react'

import cn from 'classnames'
import styles from './DateBlock.module.css'

import { IWeekCalendarDay } from '../../domain/Week.domain'

export default function DateBlock(props: {
  showedDate: IWeekCalendarDay
  chosenDate: string
  className?: string
  role?: string
  onChange?: (nextDate: string) => void
}): React.ReactElement {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const {
    showedDate,
    chosenDate,
    className,
    role = 'calendarTab',
    onChange = () => {}
  } = props

  const day = dayjs(showedDate.date)
  const isChooseDate = showedDate.date === chosenDate
  // const isToday = day.isSame(dayjs(), 'day');
  const isDisabled = day.isAfter(dayjs(), 'day')

  return (
    <button
      type="button"
      role={role}
      className={cn(
        styles.date,
        className,
        isChooseDate && styles.chosenDate,
        showedDate.isDayOff && styles.dateDayOff,
        // isToday && styles.todayDate,
        isDisabled && styles.disabled
      )}
      onClick={() => onChange(showedDate.date)}
      disabled={isDisabled}
    >
      <div className={styles.dateNumber}>{day.format('D')}&nbsp;</div>
      <div>{day.format('MM.YYYY')}</div>
      <div className={styles.dateDay}>&nbsp;·&nbsp;{day.format('dd')}</div>
    </button>
  )
}
