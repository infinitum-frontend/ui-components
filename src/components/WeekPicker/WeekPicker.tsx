import { formatDateToISO } from '@infinitum-ui/shared'
import classNames from 'classnames'
import { ComponentPropsWithoutRef, ReactElement, useState } from 'react'
import {
  createDate,
  DayMatrixInfo,
  getDaysMatrix,
  oneMonthAgo,
  oneYearAgo,
  oneMonthAhead,
  oneYearAhead
} from '~/src/utils/date'
import DateInput from '../DateInput'
import {
  useFloating,
  useInteractions,
  useDismiss,
  offset,
  flip,
  FloatingPortal,
  FloatingFocusManager
} from '@floating-ui/react'
import './WeekPicker.scss'
import {
  DateCalendarHeader,
  DateCalendarMonths,
  DateCalendarWeekdays,
  DateCalendarYears
} from '../DateCalendar'
import { IconCalendar04 } from '@infinitum-ui/icons'
import { Icon } from '../Icon'

export type WeekPickerValue = [string | Date, string | Date]
export interface WeekPickerProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange' | 'value'> {
  /** Дата в формате YYYY-MM-DD */
  value: WeekPickerValue
  /** Минимальная дата в формате YYYY-MM-DD */
  min?: string
  /** Максимальная дата в формате YYYY-MM-DD */
  max?: string
  onChange: (date: WeekPickerValue) => void
}

const WeekPicker = ({
  value,
  min,
  max,
  onChange,
  ...props
}: WeekPickerProps): ReactElement => {
  const [selectedView, setSelectedView] = useState<'day' | 'month' | 'year'>(
    'day'
  )
  const [hoveredDate, setHoveredDate] = useState<Date | undefined>()
  const [isOpened, setOpened] = useState(false)
  const [from, to] = value.map((el) => (el ? createDate(el) : undefined))
  const [localDate, setLocalDate] = useState(from || new Date())

  const daysMatrix = getDaysMatrix(localDate, min, max)

  // ============================= floating =============================
  const { x, y, refs, context } = useFloating({
    open: isOpened,
    onOpenChange: setOpened,
    placement: 'bottom-start',
    middleware: [offset(4), flip()]
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useDismiss(context)
  ])

  const getWeekHovered = (week: DayMatrixInfo[]): boolean => {
    if (!value.length) {
      return false
    }

    const from = week[0].date?.getTime()
    const to = week[week.length - 1].date?.getTime()

    if (min && new Date(min).getTime() > from) {
      return false
    }

    if (max && new Date(max).getTime() < to) {
      return false
    }

    const hoveredItem = hoveredDate?.getTime() || 0
    return from <= hoveredItem && hoveredItem <= to
  }

  const handleWeekClick = (week: DayMatrixInfo[]): void => {
    const start = week[0].date
    const end = week[week.length - 1].date
    const minDate = new Date(min as string)
    const maxDate = new Date(max as string)

    if (start <= minDate || end >= maxDate) {
      return
    }

    onChange?.([formatDateToISO(start), formatDateToISO(end)])
  }

  const handleMonthClick = (month: number): void => {
    setLocalDate((prev) => {
      const newDate = new Date(prev)
      newDate.setMonth(month)
      return newDate
    })
  }

  const handleYearClick = (year: number): void => {
    setLocalDate((prev) => {
      const newDate = new Date(prev)
      newDate.setFullYear(year)
      return newDate
    })
  }

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

  return (
    <div
      {...props}
      ref={refs.setReference}
      {...getReferenceProps({
        onClick(e) {
          e.stopPropagation()
        }
      })}
    >
      <DateInput
        onFocus={() => setOpened(true)}
        prefix={
          <Icon hoverable size="small">
            <IconCalendar04 />
          </Icon>
        }
        onPrefixClick={() => setOpened((prev) => !prev)}
      />

      <FloatingPortal>
        {isOpened && (
          <FloatingFocusManager
            context={context}
            returnFocus={false}
            initialFocus={-1}
          >
            <div
              className="inf-week-picker__dropdown"
              ref={refs.setFloating}
              {...getFloatingProps({
                onClick(e) {
                  e.stopPropagation()
                }
              })}
              style={{
                position: 'absolute',
                overflowX: 'hidden',
                overflowY: 'hidden',
                top: y ?? 0,
                left: x ?? 0
              }}
            >
              <DateCalendarHeader
                onArrowLeftClick={handlePrevClick}
                onArrowRightClick={handleNextClick}
                selectedView={selectedView}
                onSelectedViewChange={setSelectedView}
                date={localDate}
              />

              <DateCalendarWeekdays />

              {selectedView === 'day' &&
                daysMatrix.map((week, index) => {
                  return (
                    <div
                      key={index}
                      className={classNames('inf-week-picker__week', {
                        'inf-week-picker__week--hovered': getWeekHovered(week),
                        'inf-week-picker__week--picked':
                          week[0].date.toLocaleDateString() ===
                            from?.toLocaleDateString() &&
                          week[week.length - 1].date.toLocaleDateString() ===
                            to?.toLocaleDateString()
                      })}
                    >
                      {week.map((el) => (
                        <span
                          key={el.date.toDateString()}
                          className={classNames('inf-week-picker__item', {
                            'inf-week-picker__item--empty': !el.day,
                            'inf-week-picker__item--disabled': el.disabled,
                            'inf-week-picker__item--from':
                              el.date.toLocaleDateString() ===
                              from?.toLocaleDateString(),
                            'inf-week-picker__item--to':
                              el.date.toLocaleDateString() ===
                              to?.toLocaleDateString()
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
                })}

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
          </FloatingFocusManager>
        )}
      </FloatingPortal>
    </div>
  )
}

export default WeekPicker
