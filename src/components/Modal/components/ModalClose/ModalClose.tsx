import React, { ComponentPropsWithoutRef } from 'react'
import cn from 'classnames'
import './ModalClose.scss'

export interface ModalCloseProps extends ComponentPropsWithoutRef<'button'> {
  onClick: () => void
  className?: string
}

const ModalClose = React.forwardRef<HTMLButtonElement, ModalCloseProps>(
  ({ onClick, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn('inf-modal-close', className)}
        onClick={onClick}
        {...props}
      >
        <svg
          className="inf-modal-close__icon"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 6L6 18"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 6L18 18"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    )
  }
)

ModalClose.displayName = 'Modal.Close'

export default ModalClose
