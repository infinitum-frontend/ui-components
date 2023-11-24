import {
  ComponentPropsWithoutRef,
  forwardRef,
  useEffect,
  useState
} from 'react'
import {
  oneMonthAgo,
  oneMonthAhead,
  oneYearAgo,
  oneYearAhead
} from 'Utils/date'
import cn from 'classnames'
import DateCalendarYears from './DateCalendarYears'
import DateCalendarMonths from './DateCalendarMonths'
import DateCalendarDays from './DateCalendarDays'
import DateCalendarHeader from './DateCalendarHeader'
import './DateCalendar.scss'

export interface DateCalendarProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
  value: Date
  onChange: (date: Date) => void
  /** Строка в формате YYYY-MM-DD */
  min?: string
  /** Строка в формате YYYY-MM-DD */
  max?: string
}

const DateCalendar = forwardRef<HTMLDivElement, DateCalendarProps>(
  ({ value, onChange, min, max, className, ...props }, ref) => {
    const [localDate, setLocalDate] = useState(value)
    const [selectedView, setSelectedView] = useState<'day' | 'month' | 'year'>(
      'day'
    )

    useEffect(() => {
      setLocalDate(value)
    }, [value])

    const handlePrevClick = (): void => {
      if (selectedView === 'day') {
        setLocalDate(oneMonthAgo(localDate))
      } else if (selectedView === 'month') {
        setLocalDate(oneYearAgo(localDate))
      }
    }

    const handleNextClick = (): void => {
      if (selectedView === 'day') {
        setLocalDate(oneMonthAhead(localDate))
      } else if (selectedView === 'month') {
        setLocalDate(oneYearAhead(localDate))
      }
    }

    const handleDayClick = (date: Date): void => {
      onChange(date)
    }

    const handleMonthClick = (month: number): void => {
      const newDate = new Date(localDate)
      newDate.setMonth(month)

      setLocalDate(newDate)
      setSelectedView('day')
    }

    const handleYearClick = (year: number): void => {
      const newDate = new Date(localDate)
      newDate.setFullYear(year)

      setLocalDate(newDate)
      setSelectedView('day')
    }

    return (
      <div className={cn('inf-date-calendar', className)} {...props} ref={ref}>
        <DateCalendarHeader
          onArrowLeftClick={handlePrevClick}
          onArrowRightClick={handleNextClick}
          selectedView={selectedView}
          onSelectedViewChange={setSelectedView}
          date={localDate}
        />

        {selectedView === 'day' && (
          <DateCalendarDays
            value={value}
            onChange={handleDayClick}
            displayValue={localDate}
            min={min}
            max={max}
          />
        )}

        {selectedView === 'month' && (
          <DateCalendarMonths
            value={localDate.getMonth()}
            onChange={handleMonthClick}
          />
        )}

        {selectedView === 'year' && (
          <DateCalendarYears
            value={localDate.getFullYear()}
            onChange={handleYearClick}
          />
        )}
      </div>
    )
  }
)

DateCalendar.displayName = 'Calendar'

export default DateCalendar
