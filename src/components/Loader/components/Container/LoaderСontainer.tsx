import React, { ComponentPropsWithoutRef } from 'react'
import './LoaderContainer.scss'
import cn from 'classnames'

export interface LoaderContainerProps extends ComponentPropsWithoutRef<'div'> {
  /** Дополнительный className */
  className?: string
  /** Высота контейнера, px */
  height?: number
  /** На всю высоту контейнера */
  fullHeight?: Boolean
  /** Абсолютное позиционирование с фоном */
  overlay?: Boolean
}

/** Обертка для позиционирования Loader */
const LoaderContainer = React.forwardRef<HTMLDivElement, LoaderContainerProps>(
  ({ className, children, overlay, fullHeight, height, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('inf-loader-container', className, {
          'inf-loader-container--overlay': overlay,
          'inf-loader-container--full-height': fullHeight
        })}
        style={{ minHeight: height ? `${height}px` : undefined }}
        {...props}
      >
        {children}
      </div>
    )
  }
)

LoaderContainer.displayName = 'LoaderContainer'

export default LoaderContainer
