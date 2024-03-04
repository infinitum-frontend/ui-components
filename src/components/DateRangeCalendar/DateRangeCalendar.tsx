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
import DateCalendarHeader from 'Components/DateCalendar/DateCalendarHeader'
import DateCalendarMonths from 'Components/DateCalendar/DateCalendarMonths'
import DateCalendarYears from 'Components/DateCalendar/DateCalendarYears'
import DateRangeCalendarDays from './DateRangeCalendarDays'
import './DateRangeCalendar.scss'

export type DateRangeCalendarValue = [Date | undefined, Date | undefined]
export interface DateRangeCalendarProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
  value: DateRangeCalendarValue
  onChange: (dateArray: [Date, Date]) => void
  /** Строка в формате YYYY-MM-DD */
  min?: string
  /** Строка в формате YYYY-MM-DD */
  max?: string
}

const DateRangeCalendar = forwardRef<HTMLDivElement, DateRangeCalendarProps>(
  ({ value, onChange, className, min, max, ...props }, ref) => {
    // значение, с помощью которого идет изменение внутренней даты в календаре без изменения внешних значений (перелистывание недели, смена года)
    const [displayValue, setDisplayValue] = useState(value[0] || new Date())
    // внутренний интервал дат
    const [localDate, setLocalDate] = useState(value)
    const [selectedView, setSelectedView] = useState<'day' | 'month' | 'year'>(
      'day'
    )

    useEffect(() => {
      setLocalDate(value)
      if (value[0]) {
        setDisplayValue(value[0])
      }
    }, [value])

    const handlePrevClick = (): void => {
      if (selectedView === 'day') {
        setDisplayValue(oneMonthAgo(displayValue))
      } else if (selectedView === 'month') {
        setDisplayValue(oneYearAgo(displayValue))
      }
    }

    const handleNextClick = (): void => {
      if (selectedView === 'day') {
        setDisplayValue(oneMonthAhead(displayValue))
      } else if (selectedView === 'month') {
        setDisplayValue(oneYearAhead(displayValue))
      }
    }

    const handleDayClick = (date: DateRangeCalendarValue): void => {
      if (date.filter(Boolean).length !== 2) {
        setLocalDate(date)
      } else {
        onChange?.(date as [Date, Date])
      }
    }

    const handleMonthClick = (month: number): void => {
      const newDate = new Date(displayValue)
      newDate.setMonth(month)

      setDisplayValue(newDate)
      setSelectedView('day')
    }

    const handleYearClick = (year: number): void => {
      const newDate = new Date(displayValue)
      newDate.setFullYear(year)

      setDisplayValue(newDate)
      setSelectedView('day')
    }

    return (
      <div
        className={cn('inf-date-range-calendar', className)}
        {...props}
        ref={ref}
      >
        <DateCalendarHeader
          onArrowLeftClick={handlePrevClick}
          onArrowRightClick={handleNextClick}
          selectedView={selectedView}
          onSelectedViewChange={setSelectedView}
          date={displayValue}
        />

        {selectedView === 'day' && (
          <DateRangeCalendarDays
            value={localDate}
            displayValue={displayValue}
            onChange={handleDayClick}
            min={min}
            max={max}
          />
        )}

        {selectedView === 'month' && (
          <DateCalendarMonths
            value={displayValue.getMonth()}
            onChange={handleMonthClick}
          />
        )}

        {selectedView === 'year' && (
          <DateCalendarYears
            value={displayValue.getFullYear()}
            onChange={handleYearClick}
          />
        )}
      </div>
    )
  }
)

DateRangeCalendar.displayName = 'DateRangeCalendar'

export default DateRangeCalendar
