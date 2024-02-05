// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  ChangeEvent,
  ChangeEventHandler,
  forwardRef,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  ReactElement,
  useContext
} from 'react'
import cn from 'classnames'
import { TextFieldClasses } from 'Utils/textFieldClasses'
import FormGroupContext from 'Components/Form/context/group'
import FormContext from 'Components/Form/context/form'
import useFormControlHandlers from 'Components/Form/hooks/useFormControlHandlers'

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
      disabled: disabledProp,
      ...props
    },
    ref
  ): ReactElement => {
    const formGroupData = useContext(FormGroupContext)
    const formData = useContext(FormContext)
    const { onControlChange, onControlInvalid } = useFormControlHandlers()

    const disabled = disabledProp || formData?.disabled

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      onControlChange(e)
      onChange?.(e.target.value, e)
    }

    const formattedValue = getFormattedValue(value)

    return (
      <input
        type={type}
        ref={ref}
        role={'calendar'}
        value={formattedValue}
        onChange={handleChange}
        className={cn(
          'inf-native-datepicker',
          TextFieldClasses.main,
          TextFieldClasses.borderRadius.regular,
          TextFieldClasses.size.medium,
          className,
          {
            [TextFieldClasses.filled]: formattedValue
          }
        )}
        required={required || formGroupData?.required}
        aria-required={ariaRequired || formGroupData?.required}
        aria-invalid={ariaInvalid || formGroupData?.invalid}
        id={id || formGroupData?.id}
        onInvalid={onControlInvalid}
        max={getFormattedValue(max)}
        min={getFormattedValue(min)}
        disabled={disabled}
        {...props}
      />
    )
  }
)

NativeDatePicker.displayName = 'NativeDatePicker'

export default NativeDatePicker
