import React, { FocusEventHandler, FormEventHandler, ForwardedRef, ReactElement } from 'react'
import classNames from 'classnames'

export interface InfInputProps {
  /** Кастомный css-класс */
  className?: string
  onFocus?: FocusEventHandler<HTMLInputElement>
  onInput?: FormEventHandler
  onBlur?: FocusEventHandler<HTMLInputElement>
}

const InfInput = React.forwardRef<HTMLInputElement, InfInputProps>((props: InfInputProps, ref: ForwardedRef<HTMLInputElement>): ReactElement => {
  const { className = 'DEFAULT', ...restProps } = props

  return (
    <input className={classNames('inf-input', className)}
           {...restProps}
           ref={ref} />
  )
})

InfInput.displayName = 'InfInput'

export default InfInput
