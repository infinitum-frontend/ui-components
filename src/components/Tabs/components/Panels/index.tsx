import { ComponentPropsWithoutRef, ReactElement } from 'react'

export interface PanelsProps extends ComponentPropsWithoutRef<'div'> {}

const TabPanels = ({ children }: PanelsProps): ReactElement => {
  return <div>{children}</div>
}

export default TabPanels
