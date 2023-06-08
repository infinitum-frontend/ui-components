// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  ChangeEvent,
  ChangeEventHandler,
  FormEventHandler,
  forwardRef,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  ReactElement
} from 'react'
import cn from 'classnames'
import './Datepicker.scss'
import { useFormGroup } from 'Components/Form/context/group'

export interface NativeDatePickerProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'value' | 'min' | 'max'
  > {
  /**
   * Формат выбираемого времени
   * @default 'date'
   */
  type?: Extract<
    HTMLInputTypeAttribute,
    'date' | 'time' | 'datetime-local' | 'month' | 'week'
  >
  /** Дата или строка в формате YYYY-MM-DD */
  value?: Date | string
  /** Максимально допустимое значение для выбора. Дата или строка в формате YYYY-MM-DD */
  max?: Date | string
  /** Минимально допустимое значение для выбора. Дата или строка в формате YYYY-MM-DD */
  min?: Date | string
  onChange?: (value: string, e: ChangeEvent) => void
}

function getFormattedValue(date?: string | Date): string | undefined {
  if (date instanceof Date) {
    return date.toISOString().slice(0, 10)
  }

  return date
}

/** Компонент нативного выбора даты и времени */
const NativeDatePicker = forwardRef<HTMLInputElement, NativeDatePickerProps>(
  (
    {
      type = 'date',
      onChange,
      value,
      className,
      required,
      id,
      'aria-required': ariaRequired,
      'aria-invalid': ariaInvalid,
      min,
      max,
      ...props
    },
    ref
  ): ReactElement => {
    const formGroupData = useFormGroup()

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      if (formGroupData) {
        e.currentTarget.setCustomValidity('')
        formGroupData.setInvalid?.(!e.currentTarget.checkValidity())
      }
      onChange?.(e.target.value, e)
    }

    const handleInvalid: FormEventHandler<HTMLInputElement> = (e) => {
      if (formGroupData) {
        e.currentTarget.setCustomValidity(formGroupData.invalidMessage || '')
        formGroupData.setInvalid?.(true)
      }
    }

    const formattedValue = getFormattedValue(value)

    return (
      <input
        type={type}
        ref={ref}
        role={'calendar'}
        value={formattedValue}
        onChange={handleChange}
        className={cn('inf-datepicker', className, {
          'inf-datepicker--filled': formattedValue
        })}
        required={required || formGroupData?.required}
        aria-required={ariaRequired || formGroupData?.required}
        aria-invalid={ariaInvalid || formGroupData?.invalid}
        id={id || formGroupData?.id}
        onInvalid={handleInvalid}
        max={getFormattedValue(max)}
        min={getFormattedValue(min)}
        {...props}
      />
    )
  }
)

NativeDatePicker.displayName = 'NativeDatePicker'

export default NativeDatePicker
