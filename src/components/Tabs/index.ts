import TabGroup from 'Components/Tabs/components/Group'
import TabList from 'Components/Tabs/components/TabList'
import TabComponent from 'Components/Tabs/components/Tab'
import TabPanels from 'Components/Tabs/components/Panels'
import TabPanel from 'Components/Tabs/components/Panel'

export const Tab = Object.assign(TabComponent, {
  Group: TabGroup,
  List: TabList,
  Panels: TabPanels,
  Panel: TabPanel
})
