import { ReactElement } from 'react'
import { InputProps, MaskedInput } from '~/src/components/Input'
import { createDate } from '~/src/utils/date'
import { DatePickerProps } from '../DatePicker'
import { validate } from './helpers'

interface DateInputProps extends Omit<DatePickerProps, 'prefix'> {
  onComplete?: (date: string) => void
  onAccept?: (date: string) => void
  onClear?: () => void
  prefix?: InputProps['prefix']
  onPrefixClick?: InputProps['onPrefixClick']
  onFocus?: InputProps['onFocus']
}

const DateInput = ({
  value,
  size,
  placeholder,
  min,
  max,
  required,
  onComplete,
  onAccept,
  clearable,
  onClear,
  disabled,
  prefix,
  onPrefixClick,
  onFocus
}: DateInputProps): ReactElement => {
  const displayValue = value ? createDate(value).toLocaleDateString('ru') : ''

  return (
    <MaskedInput
      autoComplete="off"
      size={size}
      placeholder={placeholder}
      mask={{
        mask: Date,
        validate: (value) => validate(value, min, max)
      }}
      pattern={'[0-9]{2}.[0-9]{2}.[0-9]{4}'}
      onComplete={onComplete}
      onAccept={onAccept}
      allowClear={clearable}
      onClear={onClear}
      value={displayValue}
      disabled={disabled}
      prefix={prefix}
      required={required}
      onPrefixClick={onPrefixClick}
      onFocus={onFocus}
      max={max}
      min={min}
    />
  )
}

export default DateInput
