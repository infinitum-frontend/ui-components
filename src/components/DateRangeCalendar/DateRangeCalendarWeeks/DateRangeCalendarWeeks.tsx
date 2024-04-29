import { ReactElement, useState } from 'react'
import { getDaysMatrix, DayMatrixInfo } from 'Utils/date'
import cn from 'classnames'
import './DateRangeCalendarWeeks.scss'
import { DateRangeCalendarValue } from '../DateRangeCalendar'

export interface CalendarDaysRangeProps {
  displayValue: Date
  onChange?: ([from, to]: DateRangeCalendarValue) => void
  value: DateRangeCalendarValue
  min?: string
  max?: string
}

const DateWeekRangeCalendarDays = ({
  displayValue,
  value,
  onChange,
  min,
  max
}: CalendarDaysRangeProps): ReactElement => {
  const [hoveredDate, setHoveredDate] = useState<Date | undefined>()
  const days = getDaysMatrix(displayValue, min, max)

  const handleClick = (week: DayMatrixInfo[]): void => {
    const from = week[0].date
    const to = week[week.length - 1].date

    onChange?.([from, to])
  }

  const getHovered = (week: DayMatrixInfo[]): boolean => {
    if (week[0].disabled || week[week.length - 1].disabled || !value?.length) {
      return false
    }

    const from = week[0].date?.getTime()
    const to = week[week.length - 1].date?.getTime()
    const hoveredItem = hoveredDate?.getTime() || 0

    return from <= hoveredItem && hoveredItem <= to
  }

  return (
    <div className="inf-date-range-calendar-weeks">
      <div className="inf-date-range-calendar-weeks__weekdays">
        <span>Пн</span>
        <span>Вт</span>
        <span>Ср</span>
        <span>Чт</span>
        <span>Пт</span>
        <span>Сб</span>
        <span>Вс</span>
      </div>

      {days.map((week, index) => (
        <div
          key={index}
          className={cn('inf-date-range-calendar-weeks__week', {
            'inf-date-range-calendar-weeks__week--hovered': getHovered(week),
            'inf-date-range-calendar-weeks__week--picked':
              week[0].date.toLocaleDateString() ===
                value[0]?.toLocaleDateString() &&
              week[week.length - 1].date.toLocaleDateString() ===
                value[1]?.toLocaleDateString()
          })}
        >
          {week.map((el) => (
            <span
              key={el.date.toDateString()}
              className={cn('inf-date-range-calendar-weeks__item', {
                'inf-date-range-calendar-weeks__item--empty': !el.day,
                'inf-date-range-calendar-weeks__item--disabled': el.disabled
              })}
              onMouseEnter={() => {
                if (!el.disabled) {
                  setHoveredDate(el.date)
                }
              }}
              onMouseLeave={() => setHoveredDate(undefined)}
              onClick={() => {
                if (!el.disabled) {
                  handleClick(week)
                }
              }}
            >
              {el.day}
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}

export default DateWeekRangeCalendarDays
