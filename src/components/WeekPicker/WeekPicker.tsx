import { formatDateToISO } from '@infinitum-ui/shared'
import classNames from 'classnames'
import {
  ComponentPropsWithoutRef,
  ReactElement,
  useContext,
  useState
} from 'react'
import {
  createDate,
  DayMatrixInfo,
  getDaysMatrix,
  oneMonthAgo,
  oneYearAgo,
  oneMonthAhead,
  oneYearAhead
} from '~/src/utils/date'
import {
  useFloating,
  useInteractions,
  useDismiss,
  offset,
  flip,
  FloatingPortal,
  FloatingFocusManager
} from '@floating-ui/react'
import {
  DateCalendarHeader,
  DateCalendarMonths,
  DateCalendarWeekdays,
  DateCalendarYears
} from '../DateCalendar'
import { IconCalendar04 } from '@infinitum-ui/icons'
import { Icon } from '../Icon'
import { TextFieldClasses } from '~/src/utils/textFieldClasses'
import { InputProps } from '../Input'
import FormGroupContext from '../Form/context/group'
import FormContext from '../Form/context/form'
import { ClearButton } from '../ClearButton'
import './WeekPicker.scss'
import useFormControlHandlers from '../Form/hooks/useFormControlHandlers'
import { Space } from '../Space'

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
  size?: InputProps['size']
  disabled?: boolean
  required?: boolean
}

const WeekPicker = ({
  value,
  min,
  max,
  onChange,
  className,
  size = 'medium',
  required: requiredProp,
  disabled: disabledProp,
  ...props
}: WeekPickerProps): ReactElement => {
  const [selectedView, setSelectedView] = useState<'day' | 'month' | 'year'>(
    'day'
  )
  const [hoveredDate, setHoveredDate] = useState<Date | undefined>()
  const [isOpened, setOpened] = useState(false)
  const [from, to] = value.map((el) => (el ? createDate(el) : undefined))
  const [localDate, setLocalDate] = useState(from || new Date())

  const formGroupContext = useContext(FormGroupContext)
  const formContext = useContext(FormContext)
  const { onControlInvalid, resetControlValidity } = useFormControlHandlers()

  const required = requiredProp || formGroupContext?.required
  const disabled = disabledProp || formContext?.disabled

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

    setOpened(false)
    resetControlValidity()
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

  const hasValue = value[0] && value[1]

  return (
    <div
      {...props}
      ref={refs.setReference}
      className={classNames('inf-week-picker', className)}
      {...getReferenceProps({
        onClick(e) {
          e.stopPropagation()
        }
      })}
    >
      <button
        type="button"
        className={classNames(
          'inf-week-picker__button',
          TextFieldClasses.main,
          TextFieldClasses.borderRadius.regular,
          TextFieldClasses.size[size],
          {
            [TextFieldClasses.status[status as 'error']]: status,
            [TextFieldClasses.disabled]: disabled,
            [TextFieldClasses.focused]: isOpened && !disabled,
            [TextFieldClasses.filled]: value.length
          }
        )}
        onClick={() => setOpened((prev) => !prev)}
      >
        <Space direction="horizontal" gap="xsmall" align="center">
          <Icon hoverable size="small" color="primary">
            <IconCalendar04 />
          </Icon>

          {hasValue ? (
            <span className="inf-week-picker__display-value">
              {new Date(value[0]).toLocaleDateString('ru-Ru')} -
              {new Date(value[1]).toLocaleDateString('ru-Ru')}
            </span>
          ) : (
            <span className="inf-week-picker__placeholder">
              Выберите период
            </span>
          )}
        </Space>

        {hasValue && (
          <ClearButton
            className="inf-week-picker__clear-button"
            as="div"
            role="button"
            title="Очистить значение"
            onClick={(e) => {
              e.stopPropagation()
              resetControlValidity()
              onChange(['', ''])
            }}
          />
        )}
      </button>

      <input
        className="inf-week-picker__input"
        id={formGroupContext?.id}
        defaultValue={
          hasValue
            ? `${value
                .map((el) => new Date(el).toLocaleDateString('ru-Ru'))
                .join(' - ')}`
            : ''
        }
        onInvalid={onControlInvalid}
        required={required}
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
