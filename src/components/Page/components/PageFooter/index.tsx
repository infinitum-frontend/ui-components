// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ReactElement, ComponentPropsWithoutRef } from 'react'
import cn from 'classnames'
import './index.scss'
import { Container } from 'Components/Container'

export interface PageFooterProps extends ComponentPropsWithoutRef<'footer'> {
  className?: string
}

const PageFooter = ({ className, children }: PageFooterProps): ReactElement => {
  return (
    <footer className={cn('inf-page-footer', className)}>
      <Container>{children}</Container>
    </footer>
  )
}

PageFooter.displayName = 'PageFooter'

export default PageFooter
