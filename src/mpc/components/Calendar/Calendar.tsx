import dayjs from 'dayjs'
import '../../infrastructure/setupDayjs'
import React from 'react'

import cn from 'classnames'
import styles from './Calendar.module.css'

import CalendarHeader from './components/CalendarHeader'
import CalendarBody from './components/CalendarBody'

import { DateFormat } from './domain/Calendar.domain'
import { ChangeMonthCommandsEnum } from './enums'
import { defaultDate, isDateFormat } from '../../infrastructure/date/date'

export default function Calendar(props: {
  className?: string
  role?: string
  chosenDate?: string
  onChange?: (arg0: string) => void
  borders?: { from?: string; to?: string }
}): React.ReactElement {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const {
    className,
    role = 'calendar',
    chosenDate = '',
    onChange = () => {},
    borders,
    ...attributes
  } = props

  const validDate = isDateFormat(chosenDate) ? chosenDate : defaultDate

  const [currentMonth, setCurrentMonth] = React.useState<string>(
    dayjs(validDate).startOf('month').format(DateFormat)
  )

  const onMonthChange = (command: ChangeMonthCommandsEnum): void => {
    if (ChangeMonthCommandsEnum.setPrevMonth === command) {
      setCurrentMonth(
        dayjs(currentMonth)
          .subtract(1, 'month')
          .startOf('month')
          .format(DateFormat)
      )
    } else {
      setCurrentMonth(
        dayjs(currentMonth).add(1, 'month').startOf('month').format(DateFormat)
      )
    }
  }

  return (
    <div {...attributes} role={role} className={cn(styles.calendar, className)}>
      <CalendarHeader date={currentMonth} onChange={onMonthChange} />
      <CalendarBody
        showedMonthDate={currentMonth}
        chosenDate={validDate}
        onChange={onChange}
        // borders={{ from: dayjs().format(DateFormat) }}
        borders={borders}
      />
    </div>
  )
}
