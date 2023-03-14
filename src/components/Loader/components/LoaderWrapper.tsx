// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ComponentPropsWithoutRef, ReactElement } from 'react'
import '../style/wrapper.scss'
import cn from 'classnames'

export interface LoaderWrapperProps extends ComponentPropsWithoutRef<'div'> {
  fullHeight?: Boolean
  overlay?: Boolean
}

/** Обертка для позиционирования Loader */
const LoaderWrapper = ({
  overlay,
  fullHeight,
  children,
  ...props
}: LoaderWrapperProps): ReactElement => {
  return (
    <div
      className={cn('inf-loader-wrapper', {
        'inf-loader-wrapper--overlay': overlay,
        'inf-loader-wrapper--full-height': fullHeight
      })}
      {...props}
    >
      {children}
    </div>
  )
}

export default LoaderWrapper
