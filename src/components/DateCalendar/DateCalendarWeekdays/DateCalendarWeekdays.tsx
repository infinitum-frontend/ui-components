import { ReactElement } from 'react'
import './DateCalendarWeekdays.scss'

const DateCalendarWeekdays = (): ReactElement => {
  return (
    <div className="inf-date-calendar-weekdays">
      <span>Пн</span>
      <span>Вт</span>
      <span>Ср</span>
      <span>Чт</span>
      <span>Пт</span>
      <span>Сб</span>
      <span>Вс</span>
    </div>
  )
}

export default DateCalendarWeekdays
