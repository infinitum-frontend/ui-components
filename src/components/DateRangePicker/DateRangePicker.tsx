// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ComponentPropsWithoutRef, ReactElement, useState } from 'react'
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

/** Строка в формате YYYY-MM-DD */
export type DateRangePickerValue = [string | Date, string | Date]
export interface DateRangePickerProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
  disabled?: boolean
  value: DateRangePickerValue
  /** Строка в формате YYYY-MM-DD */
  onChange: (dateArray: [string, string]) => void
}

const DateRangePicker = ({
  value,
  disabled,
  onChange,
  className,
  ...props
}: DateRangePickerProps): ReactElement => {
  const [isOpened, setOpened] = useState(false)

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
            format: function (date: string) {
              const [from, to] = date
                .split('—')
                .map((val) => parseLocalDateString(val)) as [Date, Date]
              if (from.getFullYear() > to.getFullYear()) {
                to.setFullYear(from.getFullYear())
              }

              const strFrom = from.toLocaleDateString('ru-Ru')
              const strTo = to.toLocaleDateString('ru-Ru')

              return [strFrom, strTo].join('—')
            },
            // @ts-expect-error
            parse: function (string) {
              return string
            }
          }}
          value={value
            .map((v) => (v ? createDate(v).toLocaleDateString() : ''))
            .join('')}
          postfix={<IconCalendar />}
          onPostfixClick={() => setOpened((prev) => !prev)}
          onFocus={() => setOpened(true)}
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
