import TabGroup from 'Components/Tabs/components/Group'
import TabPanel from 'Components/Tabs/components/Panel'
import TabPanels from 'Components/Tabs/components/Panels'
import TabList from 'Components/Tabs/components/TabList'
import {
  ComponentPropsWithoutRef,
  ElementType,
  ReactElement,
  useEffect,
  useId,
  useRef
} from 'react'
import cn from 'classnames'
import useTabsContext from 'Components/Tabs/context/useTabsContext'
import { Positioning } from 'Components/Positioning'
import './index.scss'

export interface TabProps extends ComponentPropsWithoutRef<'button'> {
  as?: ElementType
  badge?: string | number
  disabled?: boolean
}

const Tab = ({
  as = 'button',
  children,
  className,
  disabled = false,
  badge
}: TabProps): ReactElement => {
  const { handleTabClick, registerTab, unregisterTab, tabs, selectedIndex } =
    useTabsContext()

  const id = useId()
  const ref = useRef<HTMLSpanElement>(null)
  const tabIndex = tabs.findIndex((tab) => tab === id)
  const active = tabIndex === selectedIndex
  const Component = as

  useEffect(() => {
    registerTab(id)
    return () => unregisterTab(id)
  }, [])

  return (
    <Component
      className={cn('inf-tab', className, {
        'inf-tab--disabled': disabled,
        'inf-tab--active': active
      })}
      onClick={() => handleTabClick(id)}
    >
      <span ref={ref} className={cn('inf-tab__label')}>
        {children}
        {active && (
          <Positioning referenceEl={ref.current} offsetTop={2}>
            <span className={'inf-tab__underline'} />
          </Positioning>
        )}
      </span>
      {(badge || Number.isInteger(badge)) && (
        <span className={'inf-tab__badge'}>{badge}</span>
      )}
    </Component>
  )
}

export default Object.assign(Tab, {
  Group: TabGroup,
  List: TabList,
  Panels: TabPanels,
  Panel: TabPanel
})
