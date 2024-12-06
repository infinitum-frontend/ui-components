// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { forwardRef, ReactNode, ComponentPropsWithoutRef } from 'react'
import cn from 'classnames'
import { ReactComponent as RemoveIcon } from 'Icons/cancel-circle.svg'
import './Tag.scss'

export interface TagProps {
  onRemove?: () => void
  disabled?: boolean
  selected?: boolean
  hoverable?: boolean
  icon?: ReactNode
}

/** Tag */
const Tag = forwardRef<
  HTMLSpanElement,
  ComponentPropsWithoutRef<'span'> & TagProps
>(
  (
    {
      children,
      className,
      onRemove,
      disabled,
      selected,
      hoverable,
      icon,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn('inf-tag', className, {
          'inf-tag--disabled': disabled,
          'inf-tag--selected': selected,
          'inf-tag--hoverable': hoverable
        })}
        {...props}
      >
        {icon && <span className="inf-tag__icon">{icon}</span>}

        {children}

        {onRemove && (
          <button
            className="inf-tag__remove-button"
            disabled={disabled}
            onClick={onRemove}
            type="button"
          >
            <RemoveIcon />
          </button>
        )}
      </span>
    )
  }
)

Tag.displayName = 'Tag'

export default Tag
