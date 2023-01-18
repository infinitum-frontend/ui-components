import {
  ComponentPropsWithoutRef,
  ElementType,
  ReactElement,
  useEffect,
  useId,
  useRef
} from 'react'
import cn from 'classnames'
import './index.scss'
import useTabsContext from 'Components/Tabs/context/useTabsContext'

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
        {active && <span className={'inf-tab__underline'} />}
      </span>
      {(badge || Number.isInteger(badge)) && (
        <span className={'inf-tab__badge'}>{badge}</span>
      )}
    </Component>
  )
}

export default Tab
