// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ReactElement, ComponentPropsWithoutRef } from 'react'
import { Container } from 'Components/Container'
import './index.scss'

export interface HeaderProps extends ComponentPropsWithoutRef<'div'> {}

const LayoutHeader = ({ children }: HeaderProps): ReactElement => {
  return (
    <div className="inf-layout-header">
      <Container>{children}</Container>
    </div>
  )
}

export default LayoutHeader
