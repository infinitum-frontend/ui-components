import { ComponentPropsWithoutRef, ReactElement, useState } from 'react'
import TabsContext, { ITabsContext } from 'Components/Tabs/context/TabsContext'

export interface TabsProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
  selectedIndex?: number
  onChange?: (index: number) => void
}

const TabGroup = ({
  selectedIndex = 0,
  onChange,
  className,
  children
}: TabsProps): ReactElement => {
  const [panels, setPanels] = useState<any[]>([])
  const [tabs, setTabs] = useState<any[]>([])
  const [selectedTabIndex, setSelectedTabIndex] =
    useState<number>(selectedIndex)

  const handleTabClick = (value: string): void => {
    const index = tabs.findIndex((item) => item === value)
    setSelectedTabIndex(index)
    onChange?.(index)
  }

  const registerTab = (data: any): void => {
    setTabs((prev) => [...prev, data])
  }

  const unregisterTab = (data: any): void => {
    setTabs((prev) => prev.filter((item) => item !== data))
  }

  const registerPanel = (data: any): void => {
    setPanels((prev) => [...prev, data])
  }
  const unregisterPanel = (data: any): void => {
    setPanels((prev) => prev.filter((item) => item !== data))
  }

  const context: ITabsContext = {
    selectedIndex: selectedTabIndex,
    tabs,
    panels,
    registerTab,
    unregisterTab,
    registerPanel,
    unregisterPanel,
    handleTabClick
  }
  return (
    <TabsContext.Provider value={context}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}

export default TabGroup
