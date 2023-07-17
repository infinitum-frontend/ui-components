// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ReactElement, useState } from 'react'
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
import { parseDate, parseLocalDateString } from 'Utils/date'
import MaskedInput from 'Components/Input/components/MaskedInput'
import { DateCalendar } from 'Components/DateCalendar'

export interface DatepickerProps {
  disabled?: boolean
  /** Дата или строка в формате dd.mm.yyyy(ru-Ru locale) */
  value?: string | Date
  onChange?: (date: string) => void
}

const DatePicker = ({
  disabled,
  value,
  onChange
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
  const localValue = parseDate(value)
  return (
    <>
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        className="inf-datepicker"
      >
        <MaskedInput
          placeholder="__.__.____"
          mask={{
            // @ts-expect-error
            mask: Date
          }}
          onComplete={(value) => onChange?.(value)}
          onAccept={(value) => {
            if (!value) {
              onChange?.(value)
            }
          }}
          postfix={<IconCalendar />}
          value={localValue}
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
            value={parseLocalDateString(localValue) || new Date()}
            onChange={(date) => {
              onChange?.(date.toLocaleDateString())
              setOpened(false)
            }}
            ref={refs.setFloating}
            {...getFloatingProps()}
          />
        )}
      </FloatingPortal>
    </>
  )
}

export default DatePicker
