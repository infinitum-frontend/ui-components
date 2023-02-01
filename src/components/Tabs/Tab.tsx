import TabGroup from 'Components/Tabs/components/Group'
import TabPanel from 'Components/Tabs/components/Panel'
import TabPanels from 'Components/Tabs/components/Panels'
import TabList from 'Components/Tabs/components/TabList'
import { ElementType, ReactElement, useEffect, useId } from 'react'
import cn from 'classnames'
import useTabsContext from 'Components/Tabs/context/useTabsContext'
import './style/index.scss'
import { PolymorphicComponent } from '~/src/utils/types'

export interface TabProps {
  badge?: string | number
  disabled?: boolean
}

const Tab = <C extends ElementType = 'button'>({
  as,
  children,
  className,
  type,
  disabled = false,
  badge,
  ...props
}: PolymorphicComponent<C, TabProps>): ReactElement => {
  const {
    handleTabClick,
    registerTab,
    unregisterTab,
    tabs,
    selectedIndex,
    variant
  } = useTabsContext()

  const id = useId()
  const tabIndex = tabs.findIndex((tab) => tab === id)
  const active = tabIndex === selectedIndex
  const Component = as || 'button'

  useEffect(() => {
    registerTab(id)
    return () => unregisterTab(id)
  }, [])

  const BaseComponent = (
    <Component
      type={Component === 'button' ? 'button' : type}
      className={cn(
        'inf-tab',
        className,
        `inf-tab--variant-${variant as string}`,
        {
          'inf-tab--disabled': disabled,
          'inf-tab--active': active
        }
      )}
      onClick={() => handleTabClick(id)}
      {...props}
    >
      {children}
      {active && <span className={'inf-tab__underline'} />}
    </Component>
  )

  if (!badge) {
    return BaseComponent
  }

  return (
    <div
      className={cn(
        'inf-tab-wrapper',
        `inf-tab--variant-${variant as string}`,
        {
          'inf-tab-wrapper--disabled': disabled
        }
      )}
    >
      {BaseComponent}
      {(badge || Number.isInteger(badge)) && (
        <span className={'inf-tab__badge'} onClick={() => handleTabClick(id)}>
          {badge}
        </span>
      )}
    </div>
  )
}

export default Object.assign(Tab, {
  Group: TabGroup,
  List: TabList,
  Panels: TabPanels,
  Panel: TabPanel
})
