import { ReactElement, useState } from 'react'
import { getDaysMatrix, DayMatrixInfo } from 'Utils/date'
import cn from 'classnames'
import './DateRangeCalendarDays.scss'
import { DateRangeCalendarValue } from '../DateRangeCalendar'

export interface CalendarDaysRangeProps {
  displayValue: Date
  onChange?: ([from, to]: DateRangeCalendarValue) => void
  value: DateRangeCalendarValue
  min?: string
  max?: string
}

const DateRangeCalendarDays = ({
  displayValue,
  value,
  onChange,
  min,
  max
}: CalendarDaysRangeProps): ReactElement => {
  const [hoveredDate, setHoveredDate] = useState<Date | undefined>()
  const days = getDaysMatrix(displayValue, min, max)

  const handleClick = (date: Date): void => {
    const length = value.filter(Boolean).length
    const isLaterThanFrom = date.getTime() > (value?.[0]?.getTime() ?? 0)

    if (length === 1 && isLaterThanFrom) {
      onChange?.([value[0], date])
    } else {
      onChange?.([date, undefined])
    }
  }

  const getHovered = (day: DayMatrixInfo): boolean => {
    if (day.disabled || !value?.length) {
      return false
    }

    const from = value?.[0]?.getTime() ?? 0
    const to = value?.[1]?.getTime() ?? 0
    const hoveredItem = hoveredDate?.getTime() || 0
    const currentDate = day.date.getTime()

    if (!from) {
      return false
    }

    if (to) {
      return from < currentDate && currentDate < to
    }

    return from < currentDate && currentDate < hoveredItem
  }
  return (
    <div className="inf-date-range-calendar-days">
      <div className="inf-date-range-calendar-days__weekdays">
        <span>Пн</span>
        <span>Вт</span>
        <span>Ср</span>
        <span>Чт</span>
        <span>Пт</span>
        <span>Сб</span>
        <span>Вс</span>
      </div>

      {days.map((week, index) => (
        <div key={index} className="inf-date-range-calendar-days__week">
          {week.map((el) => (
            <span
              key={el.date.toDateString()}
              className={cn('inf-date-range-calendar-days__item', {
                'inf-date-range-calendar-days__item--from':
                  el.date.toLocaleDateString() ===
                  value[0]?.toLocaleDateString(),
                'inf-date-range-calendar-days__item--to':
                  el.date.toLocaleDateString() ===
                  value[1]?.toLocaleDateString(),
                'inf-date-range-calendar-days__item--hovered': getHovered(el),
                'inf-date-range-calendar-days__item--empty': !el.day,
                'inf-date-range-calendar-days__item--disabled': el.disabled
              })}
              onMouseEnter={() => {
                if (!el.disabled) {
                  setHoveredDate(el.date)
                }
              }}
              onMouseLeave={() => setHoveredDate(undefined)}
              onClick={() => {
                if (!el.disabled) {
                  handleClick(el.date)
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

export default DateRangeCalendarDays
