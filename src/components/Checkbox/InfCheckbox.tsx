import { ChangeEventHandler, ComponentPropsWithoutRef, ReactElement, useState } from 'react'
import classNames from 'classnames'
import './index.scss'
import { ReactComponent as CheckIcon } from '../../icons/check.svg'
import { ReactComponent as IndeterminateIcon } from '../../icons/minus.svg'

const defaultCheckedIcon = <CheckIcon width={'16px'} height={'16px'} />
const indeterminateIcon = <IndeterminateIcon width={'8px'} height={'16px'} />
export interface InfCheckboxProps extends ComponentPropsWithoutRef<'input'> {
  variant: 'primary' | 'indeterminate'
  checked?: boolean
  disabled?: boolean
  defaultChecked?: boolean
  onChange?: ChangeEventHandler<HTMLInputElement>
}

const InfCheckbox = ({
  disabled = false,
  checked,
  defaultChecked,
  onChange,
  children,
  variant = 'primary'
}: InfCheckboxProps): ReactElement => {
  const [localChecked, setLocalChecked] = useState(checked || defaultChecked)
  if (checked === undefined && defaultChecked === undefined) {
    defaultChecked = false
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setLocalChecked(e.target.checked)
    onChange?.(e)
  }

  return (
    <label className={classNames('inf-checkbox')}>
      <input
        type={'checkbox'}
        disabled={disabled}
        defaultChecked={defaultChecked}
        checked={checked}
        onChange={handleChange} />
      <span className={classNames('inf-checkbox__box', { 'inf-checkbox__box--checked': localChecked })}>
        {variant === 'indeterminate' ? indeterminateIcon : defaultCheckedIcon}
      </span>
      <span className={'inf-checkbox__label'}>{children}</span>
    </label>
  )
}

export default InfCheckbox
