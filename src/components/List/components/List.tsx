import { ElementType, ReactElement } from 'react'
import { PolymorphicComponent } from '~/src/utils/types'
import cn from 'classnames'
import '../style/index.scss'
import ListContext from 'Components/List/context/ListContext'

export interface ListProps {
  /** Является ли список вложенным в другой. Устанавливает дополнительные оступы элементам */
  nested?: boolean
  /** Скругление границ для вложенных элементов */
  borderRadius?: 'unset' | 'regular'
  /** Максимальная высота контента, после которой начинается скролл */
  maxHeight?: number
}

const List = <C extends ElementType = 'ul'>({
  as,
  nested = false,
  maxHeight,
  style,
  borderRadius = 'unset',
  className,
  children,
  ...props
}: PolymorphicComponent<C, ListProps>): ReactElement => {
  const Component = as || 'ul'
  const context = { nested, borderRadius }

  return (
    <ListContext.Provider value={context}>
      <Component
        {...props}
        className={cn(className, 'inf-list', {
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

export default List
