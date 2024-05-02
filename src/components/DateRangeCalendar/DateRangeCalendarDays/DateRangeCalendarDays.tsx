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
  weekPick?: boolean
}

const DateRangeCalendarDays = ({
  displayValue,
  value,
  onChange,
  min,
  max,
  weekPick
}: CalendarDaysRangeProps): ReactElement => {
  const [hoveredDate, setHoveredDate] = useState<Date | undefined>()
  const days = getDaysMatrix(displayValue, min, max)

  const handleDayClick = (date: Date): void => {
    const length = value.filter(Boolean).length
    const isLaterThanFrom = date.getTime() > (value?.[0]?.getTime() ?? 0)

    if (length === 1 && isLaterThanFrom) {
      onChange?.([value[0], date])
    } else {
      onChange?.([date, undefined])
    }
  }

  const handleWeekClick = (week: DayMatrixInfo[]): void => {
    const from = week[0].date
    const to = week[week.length - 1].date
    const minDate = new Date(min as string)
    const maxDate = new Date(max as string)

    if (from <= minDate || to >= maxDate) {
      return
    }

    onChange?.([from, to])
  }

  const getDayHovered = (day: DayMatrixInfo): boolean => {
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

  const getWeekHovered = (week: DayMatrixInfo[]): boolean => {
    if (!value?.length) {
      return false
    }

    const from = week[0].date?.getTime()
    const to = week[week.length - 1].date?.getTime()
    const minDate = new Date(min as string).getTime()
    const maxDate = new Date(max as string).getTime()
    const hoveredItem = hoveredDate?.getTime() || 0

    if (from <= minDate || to >= maxDate) {
      return false
    }

    return from <= hoveredItem && hoveredItem <= to
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

      {days.map((week, index) => {
        if (weekPick) {
          return (
            <div
              key={index}
              className={cn('inf-date-range-calendar-days__week', {
                'inf-date-range-calendar-days__week--hovered':
                  getWeekHovered(week),
                'inf-date-range-calendar-days__week--picked':
                  week[0].date.toLocaleDateString() ===
                    value[0]?.toLocaleDateString() &&
                  week[week.length - 1].date.toLocaleDateString() ===
                    value[1]?.toLocaleDateString()
              })}
            >
              {week.map((el) => (
                <span
                  key={el.date.toDateString()}
                  className={cn('inf-date-range-calendar-days__item', {
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
                      handleWeekClick(week)
                    }
                  }}
                >
                  {el.day}
                </span>
              ))}
            </div>
          )
        } else {
          return (
            <div key={index} className="inf-date-range-calendar-days__week">
              {week.map((el) => (
                <span
                  key={el.date.toDateString()}
                  className={cn(
                    'inf-date-range-calendar-days__item',
                    'inf-date-range-calendar-days__item--hoverable',
                    {
                      'inf-date-range-calendar-days__item--from':
                        el.date.toLocaleDateString() ===
                        value[0]?.toLocaleDateString(),
                      'inf-date-range-calendar-days__item--to':
                        el.date.toLocaleDateString() ===
                        value[1]?.toLocaleDateString(),
                      'inf-date-range-calendar-days__item--hovered':
                        getDayHovered(el),
                      'inf-date-range-calendar-days__item--empty': !el.day,
                      'inf-date-range-calendar-days__item--disabled':
                        el.disabled
                    }
                  )}
                  onMouseEnter={() => {
                    if (!el.disabled) {
                      setHoveredDate(el.date)
                    }
                  }}
                  onMouseLeave={() => setHoveredDate(undefined)}
                  onClick={() => {
                    if (!el.disabled) {
                      handleDayClick(el.date)
                    }
                  }}
                >
                  {el.day}
                </span>
              ))}
            </div>
          )
        }
      })}
    </div>
  )
}

export default DateRangeCalendarDays
