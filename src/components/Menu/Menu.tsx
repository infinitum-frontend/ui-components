import cn from 'classnames'
import { ElementType, forwardRef, ReactElement } from 'react'
import { PolymorphicComponent, PolymorphicRef } from '~/src/utils/types'
import './Menu.scss'
import MenuItem from './components/MenuItem'
import MenuLabel from './components/MenuLabel'
import MenuContext from './context/MenuContext'

export interface MenuProps {
  /** Является ли список вложенным в другой. Устанавливает дополнительные оступы элементам */
  nested?: boolean
  /** Скругление границ для вложенных элементов */
  borderRadius?: 'unset' | 'regular'
  /** Максимальная высота контента, после которой начинается скролл */
  maxHeight?: number
  /** Отключить отступы у элементов */
  disablePadding?: boolean
  /**
   * Расстояние между блоками
   */
  gap?: 'unset' | 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'
}

function BaseMenu<C extends ElementType = 'ul'>(
  {
    as,
    nested = false,
    gap = 'unset',
    disablePadding = false,
    maxHeight,
    style,
    borderRadius = 'unset',
    className,
    children,
    ...props
  }: PolymorphicComponent<C, MenuProps>,
  ref: PolymorphicRef<C>
): ReactElement {
  const Component = as || 'ul'
  const context = { nested, borderRadius, disablePadding }

  return (
    <MenuContext.Provider value={context}>
      <Component
        {...props}
        ref={ref}
        className={cn(className, 'inf-menu', `inf-menu--gap-${gap as string}`, {
          'inf-menu--scrollable': maxHeight
        })}
        style={{
          ...style,
          maxHeight: maxHeight ? `${maxHeight as number}px` : 'unset'
        }}
      >
        {children}
      </Component>
    </MenuContext.Provider>
  )
}

const Menu = forwardRef(BaseMenu)

/** Список элементов меню */
export default Object.assign(Menu, {
  Item: MenuItem,
  Label: MenuLabel
})
