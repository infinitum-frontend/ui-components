import React, { ComponentPropsWithoutRef } from 'react'
import cn from 'classnames'
import './Container.scss'

export interface ContainerProps extends ComponentPropsWithoutRef<'div'> {
  className?: string
  fluid?: boolean
  role?: string
  children: React.ReactNode
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, fluid, children, ...props }, ref) => {
    return (
      <div
        className={cn('inf-container', className, {
          'inf-container--fluid': fluid
        })}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Container.displayName = 'Container'

export default Container
