import React, { ComponentPropsWithoutRef } from 'react'
import cn from 'classnames'
import './ModalHeader.scss'

export interface ModalHeaderProps extends ComponentPropsWithoutRef<'div'> {
  className?: string
}

const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('inf-modal-header', className)} {...props}>
        {children}
      </div>
    )
  }
)

ModalHeader.displayName = 'Modal.Header'

export default ModalHeader
