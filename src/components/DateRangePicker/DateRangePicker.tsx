// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  ComponentPropsWithoutRef,
  ReactElement,
  useContext,
  useState
} from 'react'
import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  useDismiss,
  useFloating,
  useInteractions
} from '@floating-ui/react'
import { ReactComponent as IconCalendar } from 'Icons/calendar2.svg'
import { createDate, formatDateToISO, parseLocalDateString } from 'Utils/date'
import DateRangeCalendar, {
  DateRangeCalendarValue
} from 'Components/DateRangeCalendar/DateRangeCalendar'
import MaskedInput from 'Components/Input/components/MaskedInput'
import cn from 'classnames'
import NativeDatePicker from '../DatePicker/components/NaviteDatePicker/NativeDatePicker'
import FormGroupContext from 'Components/Form/context/group'
import { formatterFn, validateFn } from 'Components/DateRangePicker/helpers'

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
}

const DateRangePicker = ({
  value,
  disabled,
  onChange,
  className,
  required: requiredProp,
  min,
  max,
  ...props
}: DateRangePickerProps): ReactElement => {
  const [isOpened, setOpened] = useState(false)
  const formGroupContext = useContext(FormGroupContext)
  const required = requiredProp || formGroupContext?.required

  // ============================= floating =============================
  const { x, y, refs, context } = useFloating({
    open: isOpened,
    onOpenChange: setOpened,
    placement: 'bottom-start',
    whileElementsMounted: autoUpdate,
    middleware: [offset(4), flip()]
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useDismiss(context)
  ])

  // ============================= render =============================
  const displayValue = value
    .map((v) => (v ? createDate(v).toLocaleDateString() : ''))
    .join('')
  const hiddenInputDateFrom = value?.[0] ? createDate(value[0]) : ''
  const hiddenInputDateTo = value?.[1] ? createDate(value[1]) : ''
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
            onChange?.(
              value
                .split('—')
                .map((localDateString) =>
                  formatDateToISO(parseLocalDateString(localDateString) as Date)
                ) as [string, string]
            )
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
            format: formatterFn,
            // @ts-expect-error
            parse: function (string) {
              return string
            },
            validate: validateFn
          }}
          value={displayValue}
          postfix={<IconCalendar />}
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
        )}
      </FloatingPortal>
    </>
  )
}

export default DateRangePicker
