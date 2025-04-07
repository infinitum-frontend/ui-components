// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  ComponentPropsWithoutRef,
  ReactElement,
  useState,
  MouseEvent,
  useContext
} from 'react'
import IconCalendar from 'Icons/calendar2.svg?react'
import {
  flip,
  FloatingFocusManager,
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
import NativeDatePicker from './components/NaviteDatePicker/NativeDatePicker'
import FormGroupContext from 'Components/Form/context/group'
import useFormControlHandlers from 'Components/Form/hooks/useFormControlHandlers'

export interface DatePickerProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'value' | 'onChange'> {
  disabled?: boolean
  /** Дата или строка в формате YYYY-MM-DD */
  value?: string | Date
  required?: boolean
  /** Плейсхолдер для внутреннего инпута */
  placeholder?: string
  /** Строка в формате YYYY-MM-DD */
  onChange?: (date: string) => void
  /** Строка в формате YYYY-MM-DD */
  min?: string
  /** Строка в формате YYYY-MM-DD */
  max?: string
  /**
   * Размер
   * @default medium
   */
  size?: 'medium' | 'small'
  /** Показывать кнопку "Сегодня" */
  withTodayButton?: boolean
}

const DatePicker = ({
  disabled,
  value,
  onChange,
  className,
  placeholder = '__.__.____',
  onClick,
  required: requiredProp,
  min,
  max,
  size = 'medium',
  withTodayButton = false,
  ...props
}: DatePickerProps): ReactElement => {
  const [isOpened, setOpened] = useState(false)
  const formGroupContext = useContext(FormGroupContext)
  const { resetControlValidity } = useFormControlHandlers()
  const required = requiredProp || formGroupContext?.required

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

  // ============================= render =============================
  const displayValue = value ? createDate(value).toLocaleDateString('ru') : ''
  const displayValueForHiddenInput = value ? createDate(value) : ''
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
          autoComplete="off"
          size={size}
          placeholder={placeholder}
          mask={{
            mask: Date
          }}
          pattern={'[0-9]{2}.[0-9]{2}.[0-9]{4}'}
          onComplete={(val) => {
            resetControlValidity()
            onChange?.(formatDateToISO(parseLocalDateString(val) as Date))
          }}
          onAccept={(value) => {
            if (!value) {
              onChange?.(value)
            }
          }}
          postfix={<IconCalendar className="inf-datepicker__calendar-icon" />}
          value={displayValue}
          onPostfixClick={() => setOpened((prev) => !prev)}
          disabled={disabled}
          onFocus={() => setOpened(true)}
        />
        {/* Скрытый нативный датапикер, необходимый для корректной работы валидации */}
        <NativeDatePicker
          className={'inf-datepicker__hidden-input'}
          min={min}
          max={max}
          value={displayValueForHiddenInput}
          required={required}
        />
      </div>
      <FloatingPortal>
        {isOpened && !disabled && (
          <FloatingFocusManager
            context={context}
            initialFocus={-1}
            returnFocus={false}
          >
            <DateCalendar
              withTodayButton={withTodayButton}
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
          </FloatingFocusManager>
        )}
      </FloatingPortal>
    </>
  )
}

export default DatePicker
