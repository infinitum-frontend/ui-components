import dayjs from 'dayjs'
import React from 'react'

import cn from 'classnames'
import styles from './CalendarComponents.module.css'

export default function CalendarDay(props: {
  className?: string
  day: string
  disabled?: boolean
  isToday?: boolean
  isDayOff?: boolean
  isChosenDate?: boolean
  isCurrentMonth?: boolean
  onClick?: (day: string) => void
}): React.ReactElement {
  const {
    className,
    day,
    disabled = false,
    isToday = false,
    isDayOff = false,
    isCurrentMonth = false,
    isChosenDate = false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onClick = () => {},
    ...attributes
  } = props
  return (
    <button
      type="button"
      {...attributes}
      aria-label="calendar-day"
      className={cn(
        styles.day,
        isToday && styles.today,
        isCurrentMonth && styles.currentMonth,
        isDayOff && styles.dayOff,
        isChosenDate && styles.chosenDate,
        className
      )}
      disabled={disabled}
      onClick={() => onClick(day)}
    >
      {dayjs(day).format('D')}
    </button>
  )
}
