import { ChangeEvent, ChangeEventHandler, ComponentPropsWithoutRef, ReactElement } from 'react'
import classNames from 'classnames'
import './index.scss'
import { ReactComponent as CheckIcon } from '../../icons/check.svg'
import { ReactComponent as IndeterminateIcon } from '../../icons/minus.svg'

const defaultCheckedIcon = <CheckIcon width={'16px'} height={'16px'} />
const indeterminateIcon = <IndeterminateIcon width={'8px'} height={'16px'} />

export interface InfCheckboxProps extends Omit<ComponentPropsWithoutRef<'input'>, 'onChange'> {
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
const InfCheckbox = ({
  disabled = false,
  checked,
  defaultChecked = false,
  onChange,
  children,
  name,
  value,
  variant = 'primary'
}: InfCheckboxProps): ReactElement => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange?.(e.target.checked, e)
  }

  return (
    <label className={classNames('inf-checkbox')}>
      <input
        type={'checkbox'}
        name={name}
        value={value}
        disabled={disabled}
        defaultChecked={checked !== undefined ? undefined : defaultChecked}
        checked={checked !== undefined ? checked : undefined}
        onChange={handleChange} />
      <span className={classNames('inf-checkbox__box', { 'inf-checkbox__box--disabled': disabled })}>
        {variant === 'indeterminate' ? indeterminateIcon : defaultCheckedIcon}
      </span>
      {children !== undefined && <span className={'inf-checkbox__label'}>{children}</span>}
    </label>
  )
}

export default InfCheckbox
