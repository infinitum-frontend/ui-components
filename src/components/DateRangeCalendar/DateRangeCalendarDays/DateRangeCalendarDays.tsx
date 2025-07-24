import { ReactElement, useState } from 'react'
import { getDaysMatrix, DayMatrixInfo, oneMonthAhead } from 'Utils/date'
import cn from 'classnames'
import './DateRangeCalendarDays.scss'
import { DateRangeCalendarValue } from '../DateRangeCalendar'
import { Space } from '~/src'
import DateCalendarWeekdays from '../../DateCalendar/DateCalendarWeekdays'

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
  const currentMonthDays = getDaysMatrix(displayValue, min, max)
  const nextMonthDays = getDaysMatrix(oneMonthAhead(displayValue), min, max)

  const handleDayClick = (date: Date): void => {
    const length = value.filter(Boolean).length
    const isLaterThanFrom = date.getTime() >= (value?.[0]?.getTime() ?? 0)

    if (length === 1 && isLaterThanFrom) {
      onChange?.([value[0], date])
    } else {
      onChange?.([date, undefined])
    }
  }

  const getDayHovered = (day: DayMatrixInfo): boolean => {
    if (day.disabled || !value?.length || day.isNextMonth || day.isPrevMonth) {
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

  const classNames = (el: DayMatrixInfo): string => {
    return cn(
      'inf-date-range-calendar-days__item',
      'inf-date-range-calendar-days__item--hoverable',
      {
        'inf-date-range-calendar-days__item--hovered': getDayHovered(el),
        'inf-date-range-calendar-days__item--from':
          el.date.toLocaleDateString() === value[0]?.toLocaleDateString() &&
          !(el.isNextMonth || el.isPrevMonth),
        'inf-date-range-calendar-days__item--to':
          el.date.toLocaleDateString() === value[1]?.toLocaleDateString() &&
          !(el.isNextMonth || el.isPrevMonth),
        'inf-date-range-calendar-days__item--one-day-interval':
          el.date.toLocaleDateString() === value[0]?.toLocaleDateString() &&
          el.date.toLocaleDateString() === value[1]?.toLocaleDateString(),
        'inf-date-range-calendar-days__item--prev-month': el.isPrevMonth,
        'inf-date-range-calendar-days__item--next-month': el.isNextMonth,
        'inf-date-range-calendar-days__item--empty': !el.day,
        'inf-date-range-calendar-days__item--disabled': el.disabled
      }
    )
  }

  return (
    <Space direction="horizontal" gap="small">
      <div>
        <div className="inf-date-range-calendar-days">
          <DateCalendarWeekdays />

          {currentMonthDays.map((week, index) => {
            return (
              <div key={index} className="inf-date-range-calendar-days__week">
                {week.map((el) => (
                  <span
                    key={el.date.toDateString()}
                    className={classNames(el)}
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
          })}
        </div>
      </div>

      <div>
        <div className="inf-date-range-calendar-days">
          <DateCalendarWeekdays />

          {nextMonthDays.map((week, index) => {
            return (
              <div key={index} className="inf-date-range-calendar-days__week">
                {week.map((el) => (
                  <span
                    key={el.date.toDateString()}
                    className={classNames(el)}
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
          })}
        </div>
      </div>
    </Space>
  )
}

export default DateRangeCalendarDays
