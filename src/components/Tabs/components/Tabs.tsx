// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ComponentPropsWithoutRef, ReactElement, useState } from 'react'
import Tab from './Tab'
import TabPanel from './Panel'
import TabPanels from './Panels'
import TabList from './TabList'
import TabsContext, { ITabsContext } from 'Components/Tabs/context/TabsContext'

// TODO:
// анимация движения подчеркивания
// увеличение жирности текста без сдвига (подсмотреть у carbon)
// стили для :focus

export interface TabsProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
  /** Индекс выбранного элемента */
  selectedIndex?: number
  /** Событие клика на элемент */
  onChange?: (index: number) => void
  /** Размер */
  size?: 'small' | 'medium'
  /** Растягивание табов на всю ширину и центрирование */
  fullWidth?: boolean
}

const Tabs = ({
  selectedIndex = 0,
  onChange,
  className,
  size = 'medium',
  fullWidth,
  children,
  ...props
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
    size,
    fullWidth
  }
  return (
    <TabsContext.Provider value={context}>
      <div className={className} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

/** Компонент для навигации между блоками с контентом */
export default Object.assign(Tabs, {
  Tab,
  List: TabList,
  Panels: TabPanels,
  Panel: TabPanel
})
