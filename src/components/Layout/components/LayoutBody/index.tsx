import React, { ComponentPropsWithoutRef } from 'react'
import { Container } from 'Components/Container'
import cn from 'classnames'
import './index.scss'

export interface LayoutBodyProps extends ComponentPropsWithoutRef<'div'> {
  className?: string
  hasContainer?: boolean
  fullHeight?: boolean
}

const LayoutBody = React.forwardRef<HTMLDivElement, LayoutBodyProps>(
  (
    { children, className, hasContainer = false, fullHeight = false, ...props },
    ref
  ) => {
    const Component = hasContainer ? Container : 'div'
    return (
      <Component
        ref={ref}
        className={cn('inf-layout-body', className, {
          'inf-layout-body--full-height': fullHeight
        })}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

LayoutBody.displayName = 'LayoutBody'

export default LayoutBody
