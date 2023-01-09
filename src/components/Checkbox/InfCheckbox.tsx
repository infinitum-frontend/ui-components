import { ChangeEventHandler, ComponentPropsWithoutRef, ReactElement } from 'react'
import classNames from 'classnames'
import './index.scss'
import { ReactComponent as CheckIcon } from '../../icons/check.svg'
import { ReactComponent as IndeterminateIcon } from '../../icons/minus.svg'

const defaultCheckedIcon = <CheckIcon width={'16px'} height={'16px'} />
const indeterminateIcon = <IndeterminateIcon width={'8px'} height={'16px'} />

export interface InfCheckboxProps extends ComponentPropsWithoutRef<'input'> {
  variant?: 'primary' | 'indeterminate'
  checked?: boolean
  disabled?: boolean
  defaultChecked?: boolean
  onChange?: ChangeEventHandler<HTMLInputElement>
}

const InfCheckbox = ({
  disabled = false,
  checked,
  defaultChecked = false,
  onChange,
  children,
  variant = 'primary'
}: InfCheckboxProps): ReactElement => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange?.(e)
  }

  return (
    <label className={classNames('inf-checkbox')}>
      <input
        type={'checkbox'}
        disabled={disabled}
        defaultChecked={checked !== undefined ? undefined : defaultChecked}
        checked={checked !== undefined ? checked : undefined}
        onChange={handleChange} />
      <span className={classNames('inf-checkbox__box', { 'inf-checkbox__box--disabled': disabled })}>
        {variant === 'indeterminate' ? indeterminateIcon : defaultCheckedIcon}
      </span>
      <span className={'inf-checkbox__label'}>{children}</span>
    </label>
  )
}

export default InfCheckbox
