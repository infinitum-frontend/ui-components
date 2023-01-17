import { ComponentPropsWithoutRef, ReactElement } from 'react'

export interface TabListProps extends ComponentPropsWithoutRef<'div'> {}

const TabList = ({ children }: TabListProps): ReactElement => {
  return <div className={'inf-tab-list'}>{children}</div>
}

export default TabList
