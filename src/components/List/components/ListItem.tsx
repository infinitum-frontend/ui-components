// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  ElementType,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  useState
} from 'react'
import { PolymorphicComponent } from '~/src/utils/types'
import '../style/list-item.scss'
import cn from 'classnames'
import ListItemButton from './ListItemButton'
import ListItemIcon from './ListItemIcon'
import ListItemContent from './ListItemContent'
import { Collapse } from 'Components/Collapse'
import { ReactComponent as TriangleIcon } from 'Icons/sort.svg'
import useListContext from 'Components/List/context/useListContext'

export interface ListItemProps {
  /** Состояние недоступности */
  disabled?: boolean
  /** Событие клика */
  onClick?: MouseEventHandler
  /** Можно ли схлопывать/расхлопывать элемент */
  collapsible?: boolean
  /** Схлопываемый контент */
  collapsedContent?: ReactNode
}

const ListItem = <C extends ElementType = 'li'>({
  children,
  disabled = false,
  collapsible = false,
  collapsedContent,
  className,
  onClick,
  as,
  ...props
}: PolymorphicComponent<C, ListItemProps>): ReactElement => {
  const [collapsed, setCollapsed] = useState(true)
  const Component = as || 'li'

  const context = useListContext()

  const handleClick: MouseEventHandler = (e) => {
    if (collapsible) {
      setCollapsed((prev) => !prev)
    }
    onClick?.(e)
  }

  if (!collapsible) {
    return (
      <Component
        {...props}
        className={cn('inf-list-item', className, {
          'inf-list-item--disabled': disabled,
          'inf-list-item--nested': context?.nested,
          'inf-list-item--br-regular': context?.borderRadius === 'regular',
          'inf-list-item--raw': context?.raw,
          'inf-list-item--no-padding': context?.disablePadding
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
        className={cn('inf-list-item', {
          'inf-list-item--disabled': disabled,
          'inf-list-item--nested': context?.nested
        })}
        onClick={handleClick}
      >
        <span
          className={cn('inf-list-item__collapse-icon', {
            'inf-list-item__collapse-icon--rotate': !collapsed
          })}
        >
          <TriangleIcon />
        </span>
        {children}
      </Component>

      <Collapse collapsed={collapsed}>{collapsedContent}</Collapse>
    </div>
  )
}

export default Object.assign(ListItem, {
  Icon: ListItemIcon,
  Content: ListItemContent,
  Button: ListItemButton
})
