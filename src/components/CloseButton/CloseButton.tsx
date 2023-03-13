import React, { ComponentPropsWithoutRef } from 'react'
import cn from 'classnames'
import './CloseButton.scss'

export interface CloseButtonProps extends ComponentPropsWithoutRef<'button'> {
  onClick: () => void
  className?: string
  size?: 'small' | 'medium'
}

const CloseButton = React.forwardRef<HTMLButtonElement, CloseButtonProps>(
  ({ onClick, className, size = 'medium', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn('inf-close-button', className, [
          `inf-close-button--size-${size}`
        ])}
        onClick={onClick}
        {...props}
      >
        <svg
          className="inf-close-button__icon"
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

CloseButton.displayName = 'CloseButton'

export default CloseButton
