import React, { ComponentPropsWithoutRef } from 'react'
import cn from 'classnames'
import './ModalBody.scss'

export interface ModalBodyProps extends ComponentPropsWithoutRef<'div'> {
  className?: string
}

const ModalBody = React.forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('inf-modal-body', className)} {...props}>
        {children}
      </div>
    )
  }
)

ModalBody.displayName = 'ModalBody'

export default ModalBody
