// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { forwardRef, ReactElement, PropsWithChildren } from 'react'
import cn from 'classnames'
import { ReactComponent as IconAlertCircle } from 'Icons/alert-circle.svg'
import './FormErrorMessage.scss'
import { formElementDisplayName } from '../../constants'

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
        <IconAlertCircle className="inf-form-error-message__alert-icon" />
        {children}
      </div>
    )
  }
)

FormErrorMessage.displayName = formElementDisplayName.ErrorMessage

export default FormErrorMessage
