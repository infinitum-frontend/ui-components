import { ComponentPropsWithoutRef, ReactElement } from 'react'
import useTabsContext from 'Components/Tabs/context/useTabsContext'
import cn from 'classnames'
import '../../style/list.scss'

export interface TabListProps extends ComponentPropsWithoutRef<'div'> {}

const TabList = ({ children }: TabListProps): ReactElement => {
  const { variant } = useTabsContext()
  return (
    <div
      className={cn(
        'inf-tab-list',
        `inf-tab-list--variant-${variant as string}`
      )}
    >
      {children}
    </div>
  )
}

export default TabList
