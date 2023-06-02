// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  InputHTMLAttributes,
  ChangeEvent,
  ReactNode,
  forwardRef
} from 'react'
import cn from 'classnames'
import './Switch.scss'

// TODO:
// defaultChecked
// labels for when on and off

export type SwitchProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'onChange' | 'disabled'
> & {
  /**
   * Переключение состояния
   */
  checked?: boolean
  /**
   * Текст подписи
   */
  label?: ReactNode
  /**
   * Состояние недоступности
   */
  disabled?: boolean
  /**
   * Обработчик переключения состояния
   */
  onChange?: (checked: boolean, event?: ChangeEvent<HTMLInputElement>) => void
}

/** Компонент переключатель */
export const Switch = forwardRef<HTMLLabelElement, SwitchProps>(
  (
    {
      checked = false,
      disabled,
      label,
      name,
      value,
      className,
      onChange,
      ...restProps
    },
    ref
  ) => {
    function handleChange(e: ChangeEvent<HTMLInputElement>): void {
      if (onChange) {
        onChange(e.target.checked, e)
      }
    }

    return (
      <label
        className={cn('inf-switch', {
          'inf-switch--checked': checked,
          'inf-switch--disabled': disabled
        })}
        ref={ref}
      >
        <input
          type="checkbox"
          onChange={handleChange}
          disabled={disabled}
          checked={checked}
          name={name}
          role="switch"
          aria-checked={checked}
          {...restProps}
        />

        <span className="inf-switch__switch">
          <span className="inf-switch__handle" />
        </span>

        {label && <span className="inf-switch__label">{label}</span>}
      </label>
    )
  }
)

Switch.displayName = 'Switch'

export default Switch
