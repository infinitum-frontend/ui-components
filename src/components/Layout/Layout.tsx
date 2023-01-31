// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ReactElement, ComponentPropsWithoutRef } from 'react'
import { Header } from '../Header'

export interface LayoutProps extends ComponentPropsWithoutRef<'div'> {}

const Layout = ({ children }: LayoutProps): ReactElement => {
  return (
    <>
      <Header />
      <div className="inf-layout">{children}</div>
    </>
  )
}

export default Layout
