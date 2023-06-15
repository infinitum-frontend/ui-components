// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { forwardRef, ReactElement } from 'react'
import { BaseInputProps } from 'Components/Input/types'
import cn from 'classnames'
import './BaseInput.scss'
import { TextFieldClasses } from '~/src/utils/textFieldClasses'

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
      `inf-input--size-${size as string}`,
      TextFieldClasses.main,
      className,
      {
        [TextFieldClasses.filled]: value,
        [TextFieldClasses.noBorder]: noBorder,
        [TextFieldClasses.status[status as 'error']]: status,
        [TextFieldClasses.borderRadius[borderRadius]]: borderRadius
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
