// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ComponentPropsWithRef, forwardRef, ReactElement } from 'react'
import cn from 'classnames'
import './FormItem.scss'
import { formElementDisplayName } from '../../constants'

export interface FormItemProps extends ComponentPropsWithRef<'div'> {}

const FormItem = forwardRef<HTMLDivElement, FormItemProps>(
  ({ className, children }, ref): ReactElement => {
    return (
      <div ref={ref} className={cn('inf-form-item', className)}>
        {children}
      </div>
    )
  }
)

FormItem.displayName = formElementDisplayName.Item

export default FormItem
