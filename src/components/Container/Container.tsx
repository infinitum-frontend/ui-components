import React, { ComponentPropsWithoutRef } from 'react'
import cn from 'classnames'
import './Container.scss'

export interface ContainerProps extends ComponentPropsWithoutRef<'div'> {
  className?: string
  /** Занимает полную ширину
   * @deprecated
   */
  fluid?: boolean
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'fluid'
  children: React.ReactNode
}

/** Контейнер ограничивающий ширину контента */
const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'xlarge', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('inf-container', className, {
          [`inf-container--size-${size as string}`]: size
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
