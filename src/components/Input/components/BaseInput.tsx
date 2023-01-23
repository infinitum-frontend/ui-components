import { forwardRef, ReactElement } from 'react'
import { BaseInputProps } from 'Components/Input/interface'
import cn from 'classnames'
import './index..scss'

const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  (
    {
      value,
      placeholder,
      borderRadius = 'unset',
      disabled,
      onFocus,
      onInput,
      onBlur,
      status,
      size = 'medium',
      noBorder,
      className,
      ...restProps
    }: BaseInputProps,
    inputRef
  ): ReactElement => {
    const classNames = cn(
      'inf-input',
      className,
      `inf-input--size-${size as string}`,
      {
        'inf-input--no-border': noBorder,
        [`inf-input--status-${status as string}`]: status,
        [`inf-input--br-${borderRadius as string}`]: borderRadius
      }
    )
    return (
      <input
        value={value}
        className={classNames}
        placeholder={placeholder}
        disabled={disabled}
        onFocus={onFocus}
        onBlur={onBlur}
        onInput={onInput}
        {...restProps}
        ref={inputRef}
      />
    )
  }
)

BaseInput.displayName = 'BaseInput'

export default BaseInput
