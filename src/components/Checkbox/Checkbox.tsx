import {
  ChangeEvent,
  ChangeEventHandler,
  ComponentPropsWithoutRef,
  forwardRef,
  ReactElement
} from 'react'
import './index.scss'
import { ReactComponent as CheckIcon } from 'Icons/check.svg'
import { ReactComponent as IndeterminateIcon } from 'Icons/minus.svg'
import cn from 'classnames'

const defaultCheckedIcon = <CheckIcon width={'16px'} height={'16px'} />
const indeterminateIcon = <IndeterminateIcon width={'8px'} height={'16px'} />

export interface CheckboxProps
  extends Omit<ComponentPropsWithoutRef<'label'>, 'onChange'> {
  /** Вариант чекбокса */
  variant?: 'primary' | 'indeterminate'
  /** Состояние выбора */
  checked?: boolean
  /** Состояние недоступности */
  disabled?: boolean
  /** HTML checked. Используется для неконтролируемого чекбокса */
  defaultChecked?: boolean
  /** HTML name */
  name?: string
  /** HTML value */
  value?: string | number
  onChange?: (checked: boolean, e: ChangeEvent) => void
}

// TODO: добавить расположение лейбла

/** Компонент чекбокса */
const Checkbox = forwardRef<HTMLLabelElement, CheckboxProps>(
  (
    {
      disabled = false,
      checked,
      defaultChecked = false,
      onChange,
      children,
      name,
      value,
      variant = 'primary',
      className,
      ...props
    },
    ref
  ): ReactElement => {
    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      onChange?.(e.target.checked, e)
    }

    return (
      <label className={cn('inf-checkbox', className)} ref={ref} {...props}>
        <input
          type={'checkbox'}
          name={name}
          value={value}
          disabled={disabled}
          defaultChecked={checked !== undefined ? undefined : defaultChecked}
          checked={checked !== undefined ? checked : undefined}
          onChange={handleChange}
        />
        <span
          className={cn('inf-checkbox__box', {
            'inf-checkbox__box--disabled': disabled
          })}
        >
          {variant === 'indeterminate' ? indeterminateIcon : defaultCheckedIcon}
        </span>
        {children !== undefined && (
          <span
            className={cn('inf-checkbox__label', {
              'inf-checkbox__label--disabled': disabled
            })}
          >
            {children}
          </span>
        )}
      </label>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export default Checkbox
