// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  ElementType,
  ReactElement,
  ReactNode,
  useEffect,
  useId
} from 'react'
import cn from 'classnames'
import useTabsContext from 'Components/Tabs/context/useTabsContext'
import './Tab.scss'
import { PolymorphicComponent } from '~/src/utils/types'

export interface TabProps {
  icon?: ReactNode
  disabled?: boolean
  /** Состояние активности элемента. Для корректной работы необходимо всем табам установить в данный проп булево значение */
  active?: boolean
}

const Tab = <C extends ElementType = 'button'>({
  as,
  children,
  className,
  type,
  disabled = false,
  active: activeProp,
  icon,
  ...props
}: PolymorphicComponent<C, TabProps>): ReactElement => {
  const {
    handleTabClick,
    registerTab,
    unregisterTab,
    tabs,
    selectedIndex,
    size,
    fullWidth
  } = useTabsContext()

  const id = useId()
  const tabIndex = tabs.findIndex((tab) => tab === id)
  const active =
    activeProp !== undefined ? activeProp : tabIndex === selectedIndex
  const Component = as || 'button'

  useEffect(() => {
    registerTab(id)
    return () => unregisterTab(id)
  }, [])

  return (
    <Component
      type={Component === 'button' ? 'button' : type}
      className={cn('inf-tab', className, `inf-tab--size-${size as string}`, {
        'inf-tab--disabled': disabled,
        'inf-tab--active': active,
        'inf-tab--fullwidth': fullWidth
      })}
      onClick={() => handleTabClick(id)}
      {...props}
    >
      {icon && <span className="inf-tab__icon">{icon}</span>}
      {children}
      {active && <span className={'inf-tab__underline'} />}
    </Component>
  )
}

export default Tab
