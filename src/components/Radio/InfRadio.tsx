import { ChangeEventHandler, ComponentPropsWithoutRef, ReactElement } from 'react'
import './index.scss'
import classNames from 'classnames'

export interface InfRadioProps extends ComponentPropsWithoutRef<'input'> {
  disabled?: boolean
  checked?: boolean
  defaultChecked?: boolean
  onChange?: ChangeEventHandler<HTMLInputElement>
}

const InfRadio = ({
  disabled = false,
  checked,
  defaultChecked = false,
  onChange,
  children
}: InfRadioProps): ReactElement => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange?.(e)
  }

  return (
    <label className={'inf-radio'}>
      <input
        type={'radio'}
        disabled={disabled}
        defaultChecked={checked !== undefined ? undefined : defaultChecked}
        checked={checked !== undefined ? checked : undefined}
        onChange={handleChange} />
      <span className={classNames('inf-radio__box', { 'inf-radio__box--disabled': disabled })}>
        <span className={'inf-radio__dot'} />
      </span>
      <span className={'inf-radio__label'}>{children}</span>
    </label>
  )
}

export default InfRadio
