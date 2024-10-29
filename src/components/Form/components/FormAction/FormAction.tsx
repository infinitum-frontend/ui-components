// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { forwardRef, PropsWithChildren, ReactElement } from 'react'
import cn from 'classnames'
import { formElementDisplayName } from '../../constants'
import { Link } from 'Components/Link'
import './FormAction.scss'

export interface FormActionProps extends PropsWithChildren {
  className?: string
}

const FormAction = forwardRef<HTMLDivElement, FormActionProps>(
  // TODO: forward ref
  ({ children, className, ...props }): ReactElement => {
    return (
      <Link className={cn('inf-form-action', className)} {...props}>
        {children}
      </Link>
    )
  }
)

FormAction.displayName = formElementDisplayName.Action

export default FormAction
