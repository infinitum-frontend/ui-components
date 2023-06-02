import React, { ComponentPropsWithoutRef } from 'react'
import cn from 'classnames'
import './Container.scss'

export interface ContainerProps extends ComponentPropsWithoutRef<'div'> {
  className?: string
  /** Занимает полную ширину */
  fluid?: boolean
  children: React.ReactNode
}

/** Компонент для создания адаптивного контейнера для контента */
const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, fluid, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          fluid ? 'inf-container--fluid' : 'inf-container',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Container.displayName = 'Container'

export default Container
