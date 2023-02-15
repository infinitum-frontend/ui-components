import React, { ComponentPropsWithoutRef } from 'react'
import './Box.scss'
import cn from 'classnames'
import { SpaceVariants } from '~/src/utils/types'

export interface BoxProps extends ComponentPropsWithoutRef<'div'> {
  className?: string
  as?: React.ElementType
  background?: 'base' | 'secondary' | 'inverse'
  padding?: SpaceVariants
}

const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ className, children, as = 'div', padding, background, ...props }, ref) => {
    const Component = as

    const styles = {
      padding: padding ? `var(--inf-space-${padding as string})` : false,
      backgroundColor: background
        ? `var(--inf-color-background-${background as string})`
        : false
    }

    return (
      <Component
        ref={ref}
        className={cn('inf-box', className)}
        style={styles}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Box.displayName = 'Box'

export default Box
