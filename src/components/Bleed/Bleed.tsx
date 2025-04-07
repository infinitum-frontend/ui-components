// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  const styles: CSSProperties = {
    margin: offset
      ? `calc(-1 * var(--inf-space-${offset as string}))`
      : undefined,
    marginInline: offsetX
      ? `calc(-1 * var(--inf-space-${offsetX as string}))`
      : undefined,
    marginBlock: offsetY
      ? `calc(-1 * var(--inf-space-${offsetY as string}))`
      : undefined,
    marginTop: offsetTop
      ? `calc(-1 * var(--inf-space-${offsetTop as string}))`
      : undefined,
    marginBottom: offsetBottom
      ? `calc(-1 * var(--inf-space-${offsetBottom as string}))`
      : undefined,
    marginLeft: offsetLeft
      ? `calc(-1 * var(--inf-space-${offsetLeft as string}))`
      : undefined,
    marginRight: offsetRight
      ? `calc(-1 * var(--inf-space-${offsetRight as string}))`
      : undefined
  }

  const Component = as

  return (
    <Component ref={ref} className={getClassNames()} style={styles} {...rest}>
      {children}
    </Component>
  )
}

const Bleed = forwardRef(BaseBleed)

/** Компонент для задания негативных отступов контенту */
export default Bleed as typeof BaseBleed
