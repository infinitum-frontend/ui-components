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
  ({ className, size = 'xlarge', fluid, children, ...props }, ref) => {
    const sizeClass = fluid
      ? 'inf-container--size-fluid'
      : `inf-container--size-${size as string}`

    return (
      <div
        ref={ref}
        className={cn('inf-container', className, sizeClass)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Container.displayName = 'Container'

export default Container
