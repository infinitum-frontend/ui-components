import React, { ReactElement, ComponentPropsWithoutRef } from 'react'
import cn from 'classnames'
import './Container.scss'

export interface ContainerProps extends ComponentPropsWithoutRef<'div'> {
  className?: string
  fluid?: boolean
  role?: string
  children: React.ReactNode
}

const Container = ({
  className,
  fluid,
  role,
  children,
  ...props
}: ContainerProps): ReactElement => {
  return (
    <div
      {...props}
      role={role}
      className={cn('inf-container', className, {
        'inf-container--fluid': fluid
      })}
    >
      {children}
    </div>
  )
}

export default Container
