// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ReactElement, ComponentPropsWithoutRef } from 'react'
import LayoutHeader from './components/LayoutHeader'
import LayoutBody from './components/LayoutBody'
import './Layout.scss'

export interface LayoutProps extends ComponentPropsWithoutRef<'div'> {}

const Layout = ({ children }: LayoutProps): ReactElement => {
  return <div className="inf-layout">{children}</div>
}

export default Object.assign(Layout, {
  Header: LayoutHeader,
  Body: LayoutBody
})
