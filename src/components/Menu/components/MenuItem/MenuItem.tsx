// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  ElementType,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  useState
} from 'react'
import { PolymorphicComponent } from '~/src/utils/types'
import './MenuItem.scss'
import cn from 'classnames'
import MenuItemButton from '../MenuItemButton'
import MenuItemIcon from '../MenuItemIcon'
import MenuItemContent from '../MenuItemContent'
import { Collapse } from 'Components/Collapse'
import TriangleIcon from 'Icons/sort.svg?react'
import useMenuContext from 'Components/Menu/context/useMenuContext'

export interface MenuItemProps {
  /** Состояние недоступности */
  disabled?: boolean
  /** Событие клика */
  onClick?: MouseEventHandler
  /** Можно ли схлопывать/расхлопывать элемент */
  collapsible?: boolean
  /** Схлопываемый контент */
  collapsedContent?: ReactNode
  /** Активное состояние */
  active?: boolean
}

const MenuItem = <C extends ElementType = 'li'>({
  children,
  disabled = false,
  collapsible = false,
  active = false,
  collapsedContent,
  className,
  onClick,
  as,
  ...props
}: PolymorphicComponent<C, MenuItemProps>): ReactElement => {
  const [collapsed, setCollapsed] = useState(true)
  const Component = as || 'li'

  const context = useMenuContext()

  const handleClick: MouseEventHandler = (e) => {
    onClick?.(e)
  }

  if (!collapsible) {
    return (
      <Component
        {...props}
        className={cn('inf-menu-item', className, {
          'inf-menu-item--disabled': disabled,
          'inf-menu-item--active': active,
          'inf-menu-item--nested': context?.nested,
          'inf-menu-item--br-regular': context?.borderRadius === 'regular',
          'inf-menu-item--no-padding': context?.disablePadding
        })}
        onClick={handleClick}
      >
        {children}
      </Component>
    )
  }

  return (
    <div>
      <Component
        {...props}
        className={cn('inf-menu-item', {
          'inf-menu-item--disabled': disabled,
          'inf-menu-item--nested': context?.nested
        })}
        onClick={handleClick}
      >
        <button
          onClick={(e) => {
            e.stopPropagation()
            if (collapsible) {
              setCollapsed((prev) => !prev)
            }
          }}
          className={cn('inf-menu-item__collapse-icon', {
            'inf-menu-item__collapse-icon--rotate': !collapsed
          })}
        >
          <TriangleIcon />
        </button>
        {children}
      </Component>

      <Collapse collapsed={collapsed}>{collapsedContent}</Collapse>
    </div>
  )
}

export default Object.assign(MenuItem, {
  Icon: MenuItemIcon,
  Content: MenuItemContent,
  Button: MenuItemButton
})
