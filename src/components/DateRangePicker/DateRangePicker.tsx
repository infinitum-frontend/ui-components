// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  useDismiss,
  useFloating,
  useInteractions
} from '@floating-ui/react'
import { ClearButton } from 'Components/ClearButton'
import DateRangeCalendar, {
  DateRangeCalendarValue
} from 'Components/DateRangeCalendar/DateRangeCalendar'
import { formatterFn, validateFn } from 'Components/DateRangePicker/helpers'
import FormGroupContext from 'Components/Form/context/group'
import MaskedInput from 'Components/Input/components/MaskedInput'
import IconCalendar from 'Icons/calendar2.svg?react'
import { createDate, formatDateToISO, parseLocalDateString } from 'Utils/date'
import cn from 'classnames'
import {
  ComponentPropsWithoutRef,
  ReactElement,
  useContext,
  useState
} from 'react'
import NativeDatePicker from '../DatePicker/components/NaviteDatePicker/NativeDatePicker'

/** Строка в формате YYYY-MM-DD */
export type DateRangePickerValue = [string | Date, string | Date]
export interface DateRangePickerProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
  disabled?: boolean
  value: DateRangePickerValue
  required?: boolean
  /** Строка в формате YYYY-MM-DD */
  onChange: (dateArray: [string, string]) => void
  /** Строка в формате YYYY-MM-DD */
  min?: string
  /** Строка в формате YYYY-MM-DD */
  max?: string
  /** Режим выбора по неделям с понедельника до воскресенья */
  weekPick?: boolean
  /**
   * Размер
   * @default medium
   */
  size?: 'medium' | 'small'
  /** Отображение кнопки очистки выбранного значения. При нажатии на кнопку вызывается обработчик onClear, а если он не был передан, то onChange. */
  clearable?: boolean
  /** Обработчик нажатия на кнопку очистки значения, которая отображается при clearable. Можно определить в нём произвольную логику. Если его не передать, то будет вызван onChange */
  onClear?: () => void
}

const DateRangePicker = ({
  value,
  disabled,
  onChange,
  className,
  required: requiredProp,
  min,
  max,
  size = 'medium',
  weekPick,
  clearable,
  onClear,
  ...props
}: DateRangePickerProps): ReactElement => {
  const [isOpened, setOpened] = useState(false)
  const formGroupContext = useContext(FormGroupContext)
  const required = requiredProp || formGroupContext?.required

  const minDate = min ? createDate(min) : undefined
  const maxDate = max ? createDate(max) : undefined

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

  // ============================= handlers =============================

  const handleClear = (): void => {
    if (onClear) {
      onClear()
    } else {
      onChange?.(['', ''])
    }
  }

  // ============================= render =============================
  const displayValue = value.every((v) => !v)
    ? ''
    : value
        .map((v) => (v ? createDate(v).toLocaleDateString('ru') : ''))
        .join('—')
  const hiddenInputDateFrom = value?.[0] ? createDate(value[0]) : ''
  const hiddenInputDateTo = value?.[1] ? createDate(value[1]) : ''
  const hasValue = Boolean(value?.[0]) && Boolean(value?.[1])
  const showClearButton = clearable && hasValue

  return (
    <>
      <div
        ref={refs.setReference}
        {...getReferenceProps({
          onClick(e) {
            e.stopPropagation()
          }
        })}
        className={cn('inf-datepicker', className)}
        {...props}
      >
        <MaskedInput
          placeholder="__.__.____—__.__.____"
          onComplete={(value) => {
            const formattedValue = formatterFn(value, minDate, maxDate)
            const isValid = validateFn(formattedValue, minDate, maxDate)

            if (isValid) {
              onChange?.(
                formattedValue
                  .split('—')
                  .map((localDateString) =>
                    formatDateToISO(
                      parseLocalDateString(localDateString) as Date
                    )
                  ) as [string, string]
              )
            } else {
              onChange?.(['', ''])
            }
          }}
          pattern={'[0-9]{2}.[0-9]{2}.[0-9]{4}—[0-9]{2}.[0-9]{2}.[0-9]{4}'}
          required={required}
          onAccept={(value) => {
            if (!value) {
              onChange?.(['', ''])
            }
          }}
          mask={{
            // @ts-expect-error
            mask: Date,
            pattern: 'd{.}`m{.}`Y{—}`d{.}`m{.}`Y',
            // @ts-expect-error
            format: (value: string) => formatterFn(value, minDate, maxDate),
            // @ts-expect-error
            parse: (string) => string,
            validate: (value) => validateFn(value, minDate, maxDate)
          }}
          value={displayValue}
          postfix={
            <div className="inf-datepicker__postfix">
              {/* TODO: переписать на использование clearable в Input */}
              {showClearButton && (
                <ClearButton
                  as="button"
                  className="inf-datepicker__clear-button"
                  title="Очистить значение"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleClear()
                  }}
                />
              )}
              <IconCalendar className="inf-datepicker__calendar-icon" />
            </div>
          }
          size={size}
          onPostfixClick={() => setOpened((prev) => !prev)}
          onFocus={() => setOpened(true)}
        />
        {/* Скрытый нативный датапикер, необходимый для корректной работы валидации */}
        <NativeDatePicker
          className={'inf-datepicker__hidden-input'}
          min={min}
          max={hiddenInputDateTo}
          value={hiddenInputDateFrom}
          required={required}
        />
        {/* Скрытый нативный датапикер, необходимый для корректной работы валидации */}
        <NativeDatePicker
          className={'inf-datepicker__hidden-input'}
          max={max}
          min={hiddenInputDateFrom}
          value={hiddenInputDateTo}
          required={required}
        />
      </div>
      <FloatingPortal>
        {isOpened && !disabled && (
          <FloatingFocusManager
            context={context}
            returnFocus={false}
            initialFocus={-1}
          >
            <DateRangeCalendar
              style={{
                position: 'absolute',
                overflowX: 'hidden',
                overflowY: 'hidden',
                top: y ?? 0,
                left: x ?? 0
              }}
              min={min}
              max={max}
              weekPick={weekPick}
              className="inf-datepicker__dropdown"
              value={
                value.map((el) =>
                  el ? createDate(el) : undefined
                ) as DateRangeCalendarValue
              }
              onChange={(dateArray) => {
                onChange?.(
                  dateArray.map((date) => formatDateToISO(date)) as [
                    string,
                    string
                  ]
                )
                setOpened(false)
              }}
              ref={refs.setFloating}
              {...getFloatingProps({
                onClick(e) {
                  e.stopPropagation()
                }
              })}
            />
          </FloatingFocusManager>
        )}
      </FloatingPortal>
    </>
  )
}

export default DateRangePicker
