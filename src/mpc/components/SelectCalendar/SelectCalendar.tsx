import React from 'react'

import cn from 'classnames'
import styles from './SelectCalendar.module.css'
import CalendarDropdown from '../CalendarDropdown/CalendarDropdown'
import dayjs from 'dayjs'
import { PresentationDateFormat } from '../../infrastructure/date/date'

export default function SelectCalendar(props: {
  placeHolder?: string
  prefix?: string
  role?: string
  className?: string
  chosenDate?: string
  onChange?: (arg0: string) => void
  hasReset?: boolean
}): React.ReactElement {
  const {
    className,
    role = 'select-calendar',
    placeHolder = 'дата',
    prefix = '',
    chosenDate = '',
    onChange = () => {
      /* default func */
    },
    hasReset = false
  } = props

  return (
    <div className={cn(styles.container, className)} role={role}>
      <div className={styles.title}>
        {chosenDate ? (
          <span>
            {prefix ? `${prefix} ` : null}
            {dayjs(chosenDate).format(PresentationDateFormat)}
          </span>
        ) : (
          <span className={styles.placeholder}>{placeHolder}</span>
        )}
      </div>

      <CalendarDropdown
        chosenDate={chosenDate}
        onChange={onChange}
        hasReset={hasReset}
      />
    </div>
  )
}
