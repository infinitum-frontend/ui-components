import { ChangeEvent, ChangeEventHandler, ComponentPropsWithoutRef, ReactElement } from 'react'
import './index.scss'
import classNames from 'classnames'
import useRadioGroup from './useRadioGroup'

export interface InfRadioProps extends Omit<ComponentPropsWithoutRef<'input'>, 'onChange'> {
  /** Состояние недоступности */
  disabled?: boolean
  /** Состояние выбора */
  checked?: boolean
  /** HTML checked. Используется для неконтролируемого чекбокса */
  defaultChecked?: boolean
  onChange?: (checked: boolean, e: ChangeEvent) => void
  /** HTML name */
  name?: string
  /** HTML value */
  value?: string
}

const InfRadio = ({
  disabled = false,
  checked,
  defaultChecked = false,
  onChange,
  children,
  name,
  value
}: InfRadioProps): ReactElement => {
  const groupData = useRadioGroup()

  if (groupData) {
    name = groupData.name
    checked = value === groupData.value
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    groupData ? groupData.onChange?.(e, value || '') : onChange?.(e.target.checked, e)
  }

  return (
    <label className={'inf-radio'}>
      <input
        type={'radio'}
        disabled={disabled}
        name={name}
        value={value}
        defaultChecked={checked !== undefined ? undefined : defaultChecked}
        checked={checked !== undefined ? checked : undefined}
        onChange={handleChange} />
      <span className={classNames('inf-radio__box', { 'inf-radio__box--disabled': disabled })}>
        <span className={'inf-radio__dot'} />
      </span>
      <span className={classNames('inf-radio__label', { 'inf-radio__label--disabled': disabled })}>{children}</span>
    </label>
  )
}

export default InfRadio
