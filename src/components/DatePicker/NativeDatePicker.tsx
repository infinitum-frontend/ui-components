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
import './index.scss'
import { useFormGroup } from 'Components/Form/context/group'

export interface NativeDatePickerProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  /**
   * Формат выбираемого времени
   * @default 'date'
   */
  type?: Extract<
    HTMLInputTypeAttribute,
    'date' | 'time' | 'datetime-local' | 'month' | 'week'
  >
  value?: string
  onChange?: (value: string, e: ChangeEvent) => void
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

    return (
      <input
        type={type}
        ref={ref}
        role={'calendar'}
        value={value}
        onChange={handleChange}
        className={cn('inf-datepicker', className, {
          'inf-datepicker--filled': value
        })}
        required={required || formGroupData?.required}
        aria-required={ariaRequired || formGroupData?.required}
        aria-invalid={ariaInvalid || formGroupData?.invalid}
        id={id || formGroupData?.id}
        onInvalid={handleInvalid}
        {...props}
      />
    )
  }
)

NativeDatePicker.displayName = 'NativeDatePicker'

export default NativeDatePicker
