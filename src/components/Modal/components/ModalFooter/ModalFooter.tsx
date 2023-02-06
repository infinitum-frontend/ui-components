import React, { ComponentPropsWithoutRef } from 'react'
import cn from 'classnames'
import './ModalFooter.scss'

export interface ModalFooterProps extends ComponentPropsWithoutRef<'div'> {
  className?: string
}

const ModalFooter = React.forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('inf-modal-footer', className)} {...props}>
        {children}
      </div>
    )
  }
)

ModalFooter.displayName = 'ModalFooter'

export default ModalFooter
