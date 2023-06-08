// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { forwardRef, ReactElement, PropsWithChildren } from 'react'
import cn from 'classnames'
import './FormErrorMessage.scss'

export interface FormErrorMessageProps extends PropsWithChildren {
  className?: string
}

const FormErrorMessage = forwardRef<HTMLDivElement, FormErrorMessageProps>(
  ({ children, className, ...props }, ref): ReactElement => {
    return (
      <div
        ref={ref}
        className={cn('inf-form-error-message', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

FormErrorMessage.displayName = 'Form.ErrorMessage'

export default FormErrorMessage
