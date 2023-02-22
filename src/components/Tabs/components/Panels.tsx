// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ComponentPropsWithoutRef, ReactElement } from 'react'

export interface TabPanelsProps extends ComponentPropsWithoutRef<'div'> {}

const TabPanels = ({ children, ...props }: TabPanelsProps): ReactElement => {
  return <div {...props}>{children}</div>
}

export default TabPanels
