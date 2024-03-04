import { ReactElement, useEffect, useRef } from 'react'
import './DateCalendarYears.scss'
import '../DateCalendarItem.scss'
import { getYearsList } from 'Utils/date'
import cn from 'classnames'

export interface CalendarYearsProps {
  value?: number
  onChange: (year: number) => void
}

const years = getYearsList()

const DateCalendarYears = ({
  value = new Date().getFullYear(),
  onChange
}: CalendarYearsProps): ReactElement => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const yearsContainer = ref.current
    if (yearsContainer) {
      const activeYear = yearsContainer.querySelector(
        '[data-selected-year=true]'
      ) as HTMLSpanElement
      yearsContainer.scrollTo({
        top: activeYear.offsetTop - 3 * activeYear.clientHeight,
        behavior: 'smooth'
      })
    }
  }, [value])

  return (
    <div className="inf-calendar-years" ref={ref}>
      {years.map((year) => (
        <span
          data-selected-year={year === value}
          key={year}
          onClick={() => onChange(year)}
          className={cn('inf-calendar-item', {
            'inf-calendar-item--selected': year === value
          })}
        >
          {year}
        </span>
      ))}
    </div>
  )
}

export default DateCalendarYears
