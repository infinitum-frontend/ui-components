import { ReactElement } from 'react'
import cn from 'classnames'
import { getDaysMatrix } from 'Utils/date'
import './DateCalendarDays.scss'
import '../DateCalendarItem.scss'

export interface CalendarDaysProps {
  displayValue: Date
  value?: Date
  onChange: (date: Date) => void
}

const DateCalendarDays = ({
  displayValue,
  value = new Date(),
  onChange
}: CalendarDaysProps): ReactElement => {
  const days = getDaysMatrix(displayValue)

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
          {week.map((el) => (
            <span
              key={el.date.toDateString()}
              className={cn('inf-calendar-item', {
                'inf-calendar-item--selected':
                  el.date.toLocaleDateString() === value?.toLocaleDateString(),
                'inf-calendar-item--empty': !el.day
              })}
              onClick={() => {
                if (el.date) {
                  onChange(el.date)
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

export default DateCalendarDays
