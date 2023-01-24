import {
  ChangeEvent,
  ChangeEventHandler,
  forwardRef,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  ReactElement
} from 'react'
import cn from 'classnames'
import './index.scss'

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
  /**
   * Состояние недоступности
   * @default false
   */
  disabled?: boolean
  value?: string
  onChange?: (value: string, e: ChangeEvent) => void
}

/** Компонент нативного выбора даты и времени */
const NativeDatePicker = forwardRef<HTMLInputElement, NativeDatePickerProps>(
  (
    { type = 'date', disabled = false, onChange, value, className, ...props },
    ref
  ): ReactElement => {
    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      onChange?.(e.target.value, e)
    }

    return (
      <input
        type={type}
        ref={ref}
        role={'calendar'}
        value={value}
        onChange={handleChange}
        className={cn('inf-datepicker', className)}
        disabled={disabled}
        {...props}
      />
    )
  }
)

NativeDatePicker.displayName = 'NativeDatePicker'

export default NativeDatePicker
