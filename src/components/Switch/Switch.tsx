// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  InputHTMLAttributes,
  useCallback,
  ChangeEvent,
  ReactNode,
  useRef,
  forwardRef
} from 'react'
import cn from 'classnames'
import { mergeRefs } from 'react-merge-refs'
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
  onChange?: (
    event?: ChangeEvent<HTMLInputElement>,
    payload?: {
      checked: boolean
      name: InputHTMLAttributes<HTMLInputElement>['name']
    }
  ) => void
}

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
    const labelRef = useRef<HTMLLabelElement>(null)

    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
          onChange(e, { checked: e.target.checked, name })
        }
      },
      [onChange, name]
    )

    return (
      <label
        className={cn('inf-switch', {
          'inf-switch--checked': checked,
          'inf-switch--disabled': disabled
        })}
        ref={mergeRefs([labelRef, ref])}
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
