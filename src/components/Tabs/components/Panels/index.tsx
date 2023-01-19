import { ComponentPropsWithoutRef, ReactElement } from 'react'

export interface TabPanelsProps extends ComponentPropsWithoutRef<'div'> {}

const TabPanels = ({ children }: TabPanelsProps): ReactElement => {
  return <div>{children}</div>
}

export default TabPanels
