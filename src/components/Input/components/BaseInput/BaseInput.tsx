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
      defaultValue,
      placeholder,
      borderRadius = 'unset',
      disabled,
      readOnly,
      onFocus,
      onChange,
      onBlur,
      status,
      size = 'medium',
      noBorder,
      className,
      ...restProps
    }: BaseInputProps,
    inputRef
  ): ReactElement => {
    const classNames = cn('inf-input', TextFieldClasses.size[size], className)
    return (
      <input
        value={value}
        defaultValue={defaultValue}
        className={classNames}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        {...restProps}
        ref={inputRef}
      />
    )
  }
)

BaseInput.displayName = 'BaseInput'

export default BaseInput
