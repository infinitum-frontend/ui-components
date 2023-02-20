import dayjs from 'dayjs'
import React from 'react'

import cn from 'classnames'
import styles from './CalendarComponents.module.css'

import { DateFormat } from '../domain/Calendar.domain'
import { ChangeMonthCommandsEnum } from '../enums'

export default function CalendarHeader(props: {
  className?: string
  date?: string
  onChange?: (command: ChangeMonthCommandsEnum) => void
}): React.ReactElement {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const {
    className,
    date = dayjs().format(DateFormat),
    onChange = () => {},
    ...attributes
  } = props

  const onSetPrevMonth = (): void => {
    onChange(ChangeMonthCommandsEnum.setPrevMonth)
  }
  const onSetNextMonth = (): void => {
    onChange(ChangeMonthCommandsEnum.setNextMonth)
  }

  return (
    <div
      {...attributes}
      aria-label="calendar-header"
      className={cn(styles.header, className)}
    >
      <button
        type="button"
        aria-label={ChangeMonthCommandsEnum.setPrevMonth}
        className={cn(styles.setBtn)}
        onClick={onSetPrevMonth}
      >
        <i className={styles.leftIcon} />
      </button>

      <div className={styles.monthYear}>{dayjs(date).format('MMMM YYYY')}</div>

      <button
        type="button"
        aria-label={ChangeMonthCommandsEnum.setNextMonth}
        className={cn(styles.setBtn)}
        onClick={onSetNextMonth}
      >
        <i className={styles.rightIcon} />
      </button>
    </div>
  )
}
