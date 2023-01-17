import { useContext } from 'react'
import TabsContext, { ITabsContext } from 'Components/Tabs/context/TabsContext'

export default function useTabsContext(): ITabsContext {
  return useContext(TabsContext)
}
