// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { forwardRef, PropsWithChildren, ReactElement } from 'react'
import cn from 'classnames'
import './FormHint.scss'

export interface FormHintProps extends PropsWithChildren {
  className?: string
}

const FormHint = forwardRef<HTMLDivElement, FormHintProps>(
  ({ children, className, ...props }, ref): ReactElement => {
    return (
      <div ref={ref} className={cn('inf-form-hint', className)} {...props}>
        {children}
      </div>
    )
  }
)

FormHint.displayName = 'Form.Hint'

export default FormHint
