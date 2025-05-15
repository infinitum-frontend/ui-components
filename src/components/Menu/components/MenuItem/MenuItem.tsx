// eslint-disable-next-line @typescript-eslint/no-unused-vars
import cn from 'classnames'
import { Collapse } from 'Components/Collapse'
import useMenuContext from 'Components/Menu/context/useMenuContext'
import TriangleIcon from 'Icons/sort.svg?react'
import {
  ElementType,
  forwardRef,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  useState
} from 'react'
import { PolymorphicComponent, PolymorphicRef } from '~/src/utils/types'
import MenuItemButton from '../MenuItemButton'
import MenuItemContent from '../MenuItemContent'
import MenuItemIcon from '../MenuItemIcon'
import './MenuItem.scss'

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
  /** Активное состояние */
  highlighted?: boolean // TODO: сделать active, а active переименовать в selected? или это одно и то же?
}

function BaseMenuItem<C extends ElementType = 'li'>(
  {
    children,
    disabled = false,
    collapsible = false,
    active = false,
    highlighted,
    collapsedContent,
    className,
    onClick,
    as,
    ...props
  }: PolymorphicComponent<C, MenuItemProps>,
  ref: PolymorphicRef<C>
): ReactElement {
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
        ref={ref}
        className={cn('inf-menu-item', className, {
          'inf-menu-item--disabled': disabled,
          'inf-menu-item--active': active,
          'inf-menu-item--highlighted': highlighted,
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
        ref={ref}
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

const MenuItem = forwardRef(BaseMenuItem)

export default Object.assign(MenuItem, {
  Icon: MenuItemIcon,
  Content: MenuItemContent,
  Button: MenuItemButton
})
