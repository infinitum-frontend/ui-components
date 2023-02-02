// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ReactElement, ComponentPropsWithoutRef } from 'react'
import { Container } from 'Components/Container'
import cn from 'classnames'
import './index.scss'

export interface LayoutHeaderProps extends ComponentPropsWithoutRef<'div'> {
  className?: string
}

const LayoutHeader = React.forwardRef<HTMLDivElement, LayoutHeaderProps>(
  ({ children, className, ...props }, ref): ReactElement => {
    return (
      <div ref={ref} className={cn('inf-layout-header', className)} {...props}>
        <Container className="inf-layout-header__container">
          {children}
        </Container>
      </div>
    )
  }
)

LayoutHeader.displayName = 'LayoutHeader'

export default LayoutHeader
