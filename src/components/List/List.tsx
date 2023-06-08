// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ElementType, ReactElement } from 'react'
import { PolymorphicComponent } from '~/src/utils/types'
import cn from 'classnames'
import './List.scss'
import ListContext from 'Components/List/context/ListContext'
import ListItem from './components/ListItem'

export interface ListProps {
  /** Является ли список вложенным в другой. Устанавливает дополнительные оступы элементам */
  nested?: boolean
  /** Скругление границ для вложенных элементов */
  borderRadius?: 'unset' | 'regular'
  /** Максимальная высота контента, после которой начинается скролл */
  maxHeight?: number
  /** Базовая html-стилизация */
  raw?: boolean
  /** Отключить отступы у элементов */
  disablePadding?: boolean
  /**
   * Расстояние между блоками
   */
  gap?: 'unset' | 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'
}

const List = <C extends ElementType = 'ul'>({
  as,
  nested = false,
  gap = 'unset',
  disablePadding = false,
  maxHeight,
  style,
  borderRadius = 'unset',
  className,
  children,
  raw = false,
  ...props
}: PolymorphicComponent<C, ListProps>): ReactElement => {
  const Component = as || 'ul'
  const context = { nested, borderRadius, raw, disablePadding }

  return (
    <ListContext.Provider value={context}>
      <Component
        {...props}
        className={cn(className, 'inf-list', `inf-list--gap-${gap as string}`, {
          'inf-list--scrollable': maxHeight
        })}
        style={{
          ...style,
          maxHeight: maxHeight ? `${maxHeight as number}px` : 'unset'
        }}
      >
        {children}
      </Component>
    </ListContext.Provider>
  )
}

/** Упорядоченный список */
export default Object.assign(List, {
  Item: ListItem
})
