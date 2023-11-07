// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  ComponentPropsWithoutRef,
  ReactElement,
  useState,
  MouseEvent
} from 'react'
import { ReactComponent as IconCalendar } from 'Icons/calendar2.svg'
import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  useDismiss,
  useFloating,
  useInteractions
} from '@floating-ui/react'
import './DatePicker.scss'
import { createDate, formatDateToISO, parseLocalDateString } from 'Utils/date'
import MaskedInput from 'Components/Input/components/MaskedInput'
import { DateCalendar } from 'Components/DateCalendar'
import cn from 'classnames'

export interface DatepickerProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'value' | 'onChange'> {
  disabled?: boolean
  /** Дата или строка в формате YYYY-MM-DD */
  value?: string | Date
  /** Плейсхолдер для внутреннего инпута */
  placeholder?: string
  /** Строка в формате YYYY-MM-DD */
  onChange?: (date: string) => void
}

const DatePicker = ({
  disabled,
  value,
  onChange,
  className,
  placeholder = '__.__.____',
  onClick,
  ...props
}: DatepickerProps): ReactElement => {
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
  const displayValue = value ? createDate(value).toLocaleDateString() : ''
  return (
    <>
      <div
        ref={refs.setReference}
        className={cn('inf-datepicker', className)}
        {...props}
        {...getReferenceProps({
          onClick(e) {
            e.stopPropagation()

            onClick?.(e as MouseEvent<HTMLDivElement>)
          }
        })}
      >
        <MaskedInput
          placeholder={placeholder}
          mask={{
            // @ts-expect-error
            mask: Date
          }}
          onComplete={(val) => {
            onChange?.(formatDateToISO(parseLocalDateString(val) as Date))
          }}
          onAccept={(value) => {
            if (!value) {
              onChange?.(value)
            }
          }}
          postfix={<IconCalendar />}
          value={displayValue}
          onPostfixClick={() => setOpened((prev) => !prev)}
          disabled={disabled}
          onFocus={() => setOpened(true)}
        />
      </div>
      <FloatingPortal>
        {isOpened && !disabled && (
          <DateCalendar
            style={{
              position: 'absolute',
              overflowX: 'hidden',
              overflowY: 'hidden',
              top: y ?? 0,
              left: x ?? 0
            }}
            className="inf-datepicker__dropdown"
            value={value ? createDate(value) : new Date()}
            onChange={(date) => {
              onChange?.(formatDateToISO(date))
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

export default DatePicker
