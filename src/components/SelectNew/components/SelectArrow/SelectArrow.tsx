import React, { ComponentPropsWithoutRef } from 'react'
import { ReactComponent as ArrowDownIcon } from 'Icons/chevron-down.svg'
import { ReactComponent as ArrowUpIcon } from 'Icons/chevron-up.svg'
import cn from 'classnames'
import './SelectArrow.scss'

export interface SelectArrowProps extends ComponentPropsWithoutRef<'div'> {
  className?: string
  opened?: boolean
}

const SelectArrow = React.forwardRef<HTMLSpanElement, SelectArrowProps>(
  ({ className, opened, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn('inf-select-arrow', className, {
          'inf-select-arrow--opened': opened
        })}
        {...props}
      >
        {opened ? <ArrowUpIcon /> : <ArrowDownIcon />}
      </span>
    )
  }
)

SelectArrow.displayName = 'SelectArrow'

export default SelectArrow
