import { ComponentPropsWithoutRef, ReactElement, useState } from 'react'
import Tab from 'Components/Tabs/components/Tab'
import TabPanel from 'Components/Tabs/components/Panel'
import TabPanels from 'Components/Tabs/components/Panels'
import TabList from 'Components/Tabs/components/List'
import TabsContext, { ITabsContext } from 'Components/Tabs/context/TabsContext'

export interface TabsProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
  /** Индекс выбранного элемента */
  selectedIndex?: number
  /** Событие клика на элемент */
  onChange?: (index: number) => void
  /** Вариант визуального оформления */
  variant?: 'default' | 'uppercase' | 'underline'
}

const Tabs = ({
  selectedIndex = 0,
  onChange,
  className,
  variant = 'default',
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
    selectedIndex: onChange ? selectedIndex : selectedTabIndex,
    tabs,
    panels,
    registerTab,
    unregisterTab,
    registerPanel,
    unregisterPanel,
    handleTabClick,
    variant
  }
  return (
    <TabsContext.Provider value={context}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}

export default Object.assign(Tabs, {
  Tab,
  List: TabList,
  Panels: TabPanels,
  Panel: TabPanel
})
