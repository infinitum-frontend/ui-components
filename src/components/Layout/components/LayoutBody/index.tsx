// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ReactElement, ComponentPropsWithoutRef } from 'react'
import './index.scss'

export interface BodyProps extends ComponentPropsWithoutRef<'div'> {}

const LayoutBody = ({ children }: BodyProps): ReactElement => {
  return <div className="inf-layout-body">{children}</div>
}

export default LayoutBody
