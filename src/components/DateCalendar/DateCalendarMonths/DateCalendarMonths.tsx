import { ReactElement } from 'react'
import { getMonthsList } from 'Utils/date'
import cn from 'classnames'
import './DateCalendarMonths.scss'
import '../DateCalendarItem.scss'

export interface CalendarMonthsProps {
  value?: number
  onChange: (month: number) => void
}

const DateCalendarMonths = ({
  value,
  onChange
}: CalendarMonthsProps): ReactElement => {
  const months = getMonthsList()

  return (
    <div className="inf-calendar-months">
      {months.map((month) => (
        <span
          key={month.name}
          onClick={() => onChange(month.number)}
          className={cn('inf-calendar-item', {
            'inf-calendar-item--selected': month.number === value
          })}
        >
          {month.name}
        </span>
      ))}
    </div>
  )
}

export default DateCalendarMonths
