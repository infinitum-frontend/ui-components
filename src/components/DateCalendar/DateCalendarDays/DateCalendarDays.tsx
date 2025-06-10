import { ReactElement } from 'react'
import cn from 'classnames'
import { getDaysMatrix } from 'Utils/date'
import './DateCalendarDays.scss'
import '../DateCalendarItem.scss'

export interface CalendarDaysProps {
  displayValue: Date
  value?: Date
  onChange: (date: Date) => void
  min?: string
  max?: string
}

const DateCalendarDays = ({
  displayValue,
  value = new Date(),
  onChange,
  min,
  max
}: CalendarDaysProps): ReactElement => {
  const days = getDaysMatrix(displayValue, min, max)

  return (
    <div className="inf-calendar-days">
      <div className="inf-calendar-days__weekdays">
        <span>Пн</span>
        <span>Вт</span>
        <span>Ср</span>
        <span>Чт</span>
        <span>Пт</span>
        <span>Сб</span>
        <span>Вс</span>
      </div>

      {days.map((week, index) => (
        <div key={index} className="inf-calendar-days__week">
          {week.map((el) => {
            const isDateSelected =
              el.date.toLocaleDateString() === value?.toLocaleDateString()
            return (
              <span
                key={el.date.toDateString()}
                className={cn('inf-calendar-item', {
                  'inf-calendar-item--selected': isDateSelected,
                  'inf-calendar-item--empty': !el.day,
                  'inf-calendar-item--today':
                    el.date.toLocaleDateString() ===
                      new Date().toLocaleDateString() && !isDateSelected,
                  'inf-calendar-item--disabled': el.disabled,
                  'inf-calendar-item--prev-month':
                    el.isPrevMonth && !isDateSelected,
                  'inf-calendar-item--next-month':
                    el.isNextMonth && !isDateSelected
                })}
                onClick={() => {
                  if (el.date) {
                    onChange(el.date)
                  }
                }}
              >
                {el.day}
              </span>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default DateCalendarDays
