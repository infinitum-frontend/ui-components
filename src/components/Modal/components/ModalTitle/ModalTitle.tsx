import React, { ComponentPropsWithoutRef } from 'react'
import { Heading } from 'Components/Heading'
import cn from 'classnames'

export interface ModalTitleProps extends ComponentPropsWithoutRef<'div'> {
  className?: string
}

const ModalTitle = React.forwardRef<HTMLDivElement, ModalTitleProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Heading
        ref={ref}
        className={cn('inf-modal-title', className)}
        level="3"
        {...props}
      >
        {children}
      </Heading>
    )
  }
)

ModalTitle.displayName = 'Modal.Title'

export default ModalTitle
