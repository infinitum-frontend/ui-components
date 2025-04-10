// eslint-disable-next-line @typescript-eslint/no-unused-vars
import cn from 'classnames'
import ArrowDownIcon from 'Icons/chevron-down.svg?react'
import ArrowUpIcon from 'Icons/chevron-up.svg?react'
import {
  ElementType,
  forwardRef,
  ReactElement,
  ReactNode,
  useState
} from 'react'
import { Popover } from '~/src/components/Popover'
import { PolymorphicComponent, PolymorphicRef } from '~/src/utils/types'
import './HeaderNavItem.scss'

export interface HeaderNavItemProps {
  active?: boolean
  submenu?: ReactNode | ((props: { close: () => void }) => ReactNode)
}

function BaseHeaderNavItem<C extends ElementType = 'a'>(
  props: PolymorphicComponent<C, HeaderNavItemProps>,
  ref: PolymorphicRef<C>
): ReactElement {
  const {
    className,
    children,
    as = 'a',
    active = false,
    submenu,
    onClick,
    ...rest
  } = props

  const [isSubmenuOpen, setSubmenuOpen] = useState(false)

  const close = (): void => {
    setSubmenuOpen(false)
  }

  const Component = as

  const hasSubmenu = Boolean(submenu)

  if (hasSubmenu) {
    return (
      <Popover
        open={isSubmenuOpen}
        onOpenChange={setSubmenuOpen}
        placement="bottom-start"
        offset={{
          mainAxis: 4
        }}
      >
        <Popover.Trigger>
          <Component
            ref={ref}
            className={cn('inf-header-nav-item', className, {
              'inf-header-nav-item--active': active
            })}
            {...rest}
            onClick={(e) => {
              setSubmenuOpen((prev) => !prev)
            }}
          >
            {children}
            {hasSubmenu && (
              <span className="inf-header-nav-item__arrow">
                {isSubmenuOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </span>
            )}
          </Component>
        </Popover.Trigger>
        <Popover.Content hasPadding={false} width="330px">
          <div className="inf-header-nav-item__submenu-dropdown">
            {typeof submenu === 'function' ? submenu({ close }) : submenu}
          </div>
        </Popover.Content>
      </Popover>
    )
  }

  return (
    <Component
      ref={ref}
      className={cn('inf-header-nav-item', className, {
        'inf-header-nav-item--active': active
      })}
      {...rest}
    >
      {children}
    </Component>
  )
}

const HeaderNavItem = forwardRef(BaseHeaderNavItem)

HeaderNavItem.displayName = 'HeaderNav.Item'

export default HeaderNavItem as typeof BaseHeaderNavItem
