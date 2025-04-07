// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ComponentPropsWithoutRef, ReactElement, useContext } from 'react'
import { createDate, formatDateToISO, parseLocalDateString } from 'Utils/date'
import MaskedInput from 'Components/Input/components/MaskedInput'
import { DateCalendar } from 'Components/DateCalendar'
import cn from 'classnames'
import NativeDatePicker from '../NaviteDatePicker/NativeDatePicker'
import FormGroupContext from 'Components/Form/context/group'
import useFormControlHandlers from 'Components/Form/hooks/useFormControlHandlers'
import { Space } from 'Components/Space'
import './DatePickerInline.scss'

// TODO: отрефакторить DatePicker, чтобы убрать дублирование инпута, например, не используется проп size из DatePicker

export interface DatePickerInlineProps
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
  /** Показывать кнопку "Сегодня" */
  withTodayButton?: boolean
}

const DatePickerInline = ({
  disabled,
  value,
  onChange,
  className,
  placeholder = '__.__.____',
  onClick,
  required: requiredProp,
  min,
  max,
  withTodayButton = false,
  ...props
}: DatePickerInlineProps): ReactElement => {
  const formGroupContext = useContext(FormGroupContext)
  const { resetControlValidity } = useFormControlHandlers()
  const required = requiredProp || formGroupContext?.required

  // ============================= render =============================
  const displayValue = value ? createDate(value).toLocaleDateString('ru') : ''
  const displayValueForHiddenInput = value ? createDate(value) : ''

  return (
    <>
      <Space
        className={cn('inf-datepicker-inline', className)}
        gap="small"
        {...props}
      >
        <MaskedInput
          autoComplete="off"
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
          value={displayValue}
          disabled={disabled}
        />
        {/* Скрытый нативный датапикер, необходимый для корректной работы валидации */}
        <NativeDatePicker
          className={'inf-datepicker-inline__hidden-input'}
          min={min}
          max={max}
          value={displayValueForHiddenInput}
          required={required}
        />

        <DateCalendar
          min={min}
          max={max}
          className="inf-datepicker-inline__calendar"
          value={value ? createDate(value) : new Date()}
          onChange={(date) => {
            onChange?.(formatDateToISO(date))
          }}
          withTodayButton={withTodayButton}
        />
      </Space>
    </>
  )
}

export default DatePickerInline
