import cn from 'classnames'
import { CSSProperties, ElementType, forwardRef, ReactElement } from 'react'
import {
  PolymorphicComponent,
  PolymorphicRef,
  SpaceVariants
} from '~/src/utils/types'
import './Bleed.scss'

export interface BleedProps {
  offset?: SpaceVariants
  offsetLeft?: SpaceVariants
  offsetRight?: SpaceVariants
  offsetBottom?: SpaceVariants
  offsetTop?: SpaceVariants
  offsetX?: SpaceVariants
  offsetY?: SpaceVariants
  /**
   * На всю ширину контейнера (width: 100%)
   */
  fullWidth?: boolean
  /**
   * На всю высоту контейнера (height: 100%)
   */
  fullHeight?: boolean
}

function BaseBleed<C extends ElementType = 'div'>(
  props: PolymorphicComponent<C, BleedProps>,
  ref: PolymorphicRef<C>
): ReactElement {
  // пропы деструктурируем в теле компонента, тк в аргументах функции это ломает отображение таблицы пропов
  const {
    as = 'div',
    className,
    offset,
    offsetX,
    offsetY,
    offsetBottom,
    offsetLeft,
    offsetRight,
    offsetTop,
    fullWidth,
    fullHeight,
    children,
    style,
    ...rest
  } = props
  const getClassNames = (): string => {
    return cn('inf-bleed', className, {
      'inf-bleed--full-width': fullWidth,
      'inf-bleed--full-height': fullHeight
    })
  }

  const getNegativeMargin = (
    value: SpaceVariants | undefined
  ): string | undefined => {
    if (!value) return undefined
    return `calc(-1 * var(--inf-space-${value as string}))`
  }

  const styles: CSSProperties = {
    margin: getNegativeMargin(offset),
    marginLeft: getNegativeMargin(offsetLeft ?? offsetX ?? offset),
    marginRight: getNegativeMargin(offsetRight ?? offsetX ?? offset),
    marginTop: getNegativeMargin(offsetTop ?? offsetY ?? offset),
    marginBottom: getNegativeMargin(offsetBottom ?? offsetY ?? offset),
    ...style
  }

  const cleanedStyle = Object.fromEntries(
    Object.entries(styles).filter(([key, value]) => value !== undefined)
  )

  const Component = as

  return (
    <Component
      ref={ref}
      className={getClassNames()}
      style={cleanedStyle}
      {...rest}
    >
      {children}
    </Component>
  )
}

const Bleed = forwardRef(BaseBleed)

/** Компонент для задания негативных отступов контенту */
export default Bleed as typeof BaseBleed
