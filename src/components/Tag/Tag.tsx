// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { forwardRef, ReactNode, ComponentPropsWithoutRef } from 'react'
import cn from 'classnames'
import { ReactComponent as CrossInCircleIcon } from 'Icons/crossInCircle.svg'
import './Tag.scss'

export interface TagProps {
  onRemove?: () => void
  disabled?: boolean
}

/** Tag */
const Tag = forwardRef<
  HTMLSpanElement,
  ComponentPropsWithoutRef<'span'> & TagProps
>(({ children, className, onRemove, disabled, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn('inf-tag', className, {
        'inf-tag--disabled': disabled
      })}
      {...props}
    >
      {children}
      {onRemove && (
        <button
          className="inf-tag__remove-button"
          disabled={disabled}
          onClick={onRemove}
          type="button"
        >
          <CrossInCircleIcon />
        </button>
      )}
    </span>
  )
})

Tag.displayName = 'Tag'

export default Tag
