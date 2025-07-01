// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ComponentPropsWithoutRef, ReactElement, useContext } from 'react'
import { createDate, formatDateToISO, parseLocalDateString } from 'Utils/date'
import { DateCalendar } from 'Components/DateCalendar'
import FormGroupContext from 'Components/Form/context/group'
import useFormControlHandlers from 'Components/Form/hooks/useFormControlHandlers'
import { Space } from 'Components/Space'
import { DatePickerProps } from '~/src'
import DateInput from '~/src/components/DateInput'

export interface DatePickerInlineProps
  extends Omit<
      ComponentPropsWithoutRef<'div'>,
      'value' | 'onChange' | 'onInput'
    >,
    DatePickerProps {}

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
  clearable,
  onClear,
  ...props
}: DatePickerInlineProps): ReactElement => {
  const formGroupContext = useContext(FormGroupContext)
  const { resetControlValidity } = useFormControlHandlers()
  const required = requiredProp || formGroupContext?.required

  return (
    <>
      <Space className={className} gap="small" {...props}>
        <DateInput
          placeholder={placeholder}
          min={min}
          max={max}
          required={required}
          onChange={onChange}
          disabled={disabled}
          value={value}
          onComplete={(val) => {
            resetControlValidity()
            onChange?.(formatDateToISO(parseLocalDateString(val) as Date))
          }}
          onAccept={(value) => {
            if (!value) {
              onChange?.(value)
            }
          }}
          clearable={clearable}
          onClear={onClear}
        />

        <DateCalendar
          min={min}
          max={max}
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
