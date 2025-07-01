import {
  ComponentPropsWithoutRef,
  forwardRef,
  useEffect,
  useState
} from 'react'
import { oneMonthAgo, oneMonthAhead } from 'Utils/date'
import cn from 'classnames'
import DateRangeCalendarDays from './DateRangeCalendarDays'
import './DateRangeCalendar.scss'
import DateRangeCalendarHeader from './DateRangeCalendarHeader'

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

    useEffect(() => {
      setLocalDate(value)
      if (value[0]) {
        setDisplayValue(value[0])
      }
    }, [value])

    const handlePrevClick = (): void => {
      setDisplayValue(oneMonthAgo(displayValue))
    }

    const handleNextClick = (): void => {
      setDisplayValue(oneMonthAhead(displayValue))
    }

    const handleDayClick = (date: DateRangeCalendarValue): void => {
      if (date.filter(Boolean).length !== 2) {
        setLocalDate(date)
      } else {
        onChange?.(date as [Date, Date])
      }
    }

    return (
      <div
        className={cn('inf-date-range-calendar', className)}
        {...props}
        ref={ref}
      >
        <DateRangeCalendarHeader
          onArrowLeftClick={handlePrevClick}
          onArrowRightClick={handleNextClick}
          date={displayValue}
        />

        <DateRangeCalendarDays
          value={localDate}
          displayValue={displayValue}
          onChange={handleDayClick}
          min={min}
          max={max}
        />
      </div>
    )
  }
)

DateRangeCalendar.displayName = 'DateRangeCalendar'

export default DateRangeCalendar
