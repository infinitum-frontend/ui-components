import dayjs from 'dayjs'
import React from 'react'

import cn from 'classnames'
import styles from './CalendarComponents.module.css'

import {
  DateFormat,
  getMonthDays,
  DaysOfWeek,
  sliceByWeek
} from '../domain/Calendar.domain'
import CalendarDay from './CalendarDay'

export default function CalendarBody(props: {
  className?: string
  showedMonthDate?: string
  chosenDate?: string
  onChange?: (arg0: string) => void
  borders?: { from?: string; to?: string }
}): React.ReactElement {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const {
    className,
    showedMonthDate = dayjs().format(DateFormat),
    chosenDate,
    borders,
    onChange = () => {},
    ...attributes
  } = props

  const monthDaysMatrix = sliceByWeek(getMonthDays(showedMonthDate))

  return (
    <div
      {...attributes}
      aria-label="calendar-body"
      className={cn(styles.body, className)}
    >
      <table>
        <thead>
          <tr>
            {DaysOfWeek.map((day) => (
              <td key={day} className={styles.weekday}>
                {day}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {monthDaysMatrix.map((week, weekIndex) => (
            // eslint-disable-next-line react/no-array-index-key
            <tr key={`week${weekIndex}`}>
              {week.map((day, dayIndex) => {
                const isDayOff = dayjs(day).weekday() > 4

                const disabled =
                  (borders?.from &&
                    dayjs(day).isBefore(dayjs(borders.from), 'day')) ||
                  (borders?.to &&
                    dayjs(day).isAfter(dayjs(borders.to), 'day')) ||
                  false

                return (
                  // eslint-disable-next-line react/no-array-index-key
                  <td key={`day${dayIndex}`}>
                    <CalendarDay
                      day={day}
                      isCurrentMonth={dayjs(day).isSame(
                        showedMonthDate,
                        'month'
                      )}
                      isDayOff={isDayOff}
                      isToday={dayjs(day).isSame(dayjs(), 'day')}
                      isChosenDate={dayjs(day).isSame(chosenDate, 'day')}
                      disabled={disabled}
                      onClick={onChange}
                    />
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
