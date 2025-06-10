// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  CSSProperties,
  ElementType,
  forwardRef,
  ReactElement,
  ReactNode
} from 'react'
import cn from 'classnames'
import { PolymorphicComponent, PolymorphicRef } from '~/src/utils/types'
import './Grid.scss'
import { GridItem } from './GridItem'

export interface GridProps {
  /**
   * Расстояние между блоками
   */
  gap?:
    | 'xxsmall'
    | 'xsmall'
    | 'small'
    | 'medium'
    | 'large'
    | 'xlarge'
    | 'xxlarge'
  /**
   * Расстояние между рядами
   */
  rowGap?:
    | 'xxsmall'
    | 'xsmall'
    | 'small'
    | 'medium'
    | 'large'
    | 'xlarge'
    | 'xxlarge'
  /**
   * Расстояние между колонками
   */
  columnGap?:
    | 'xxsmall'
    | 'xsmall'
    | 'small'
    | 'medium'
    | 'large'
    | 'xlarge'
    | 'xxlarge'
  /**
   * Минимальная ширина колонки
   * @example 250px
   */
  min?: string
  rowFillMethod?: 'auto-fill' | 'auto-fit'
  /**
   * CSS свойство grid-template-columns
   */
  templateColumns?: CSSProperties['gridTemplateColumns']
  /**
   * CSS свойство grid-template-rows
   */
  templateRows?: CSSProperties['gridTemplateRows']
  /**
   * CSS свойство grid-template-areas
   */
  templateAreas?: CSSProperties['gridTemplateAreas']
  /**
   * CSS свойство align-items
   */
  alignItems?: CSSProperties['alignItems']
  /**
   * CSS свойство justify-items
   */
  justifyItems?: CSSProperties['justifyItems']
  /**
   * Дочерние элементы
   */
  children?: ReactNode
}

function BaseGrid<C extends ElementType = 'div'>(
  props: PolymorphicComponent<C, GridProps>,
  ref: PolymorphicRef<C>
): ReactElement {
  const {
    as = 'div',
    className,
    min = '250px',
    gap = 'medium',
    rowFillMethod = 'auto-fit',
    rowGap,
    columnGap,
    templateColumns,
    templateRows,
    templateAreas,
    alignItems,
    justifyItems,
    children,
    style,
    ...rest
  } = props

  const Component = as

  return (
    <Component
      ref={ref}
      className={cn(
        'inf-grid',
        className,
        {
          [`inf-grid--row-gap-${rowGap as string}`]: rowGap,
          [`inf-grid--column-gap-${columnGap as string}`]: columnGap
        },
        `inf-grid--gap-${gap as string}`
      )}
      style={{
        '--minimum': min,
        '--row-fill-method': rowFillMethod,
        gridTemplateColumns: templateColumns || undefined,
        gridTemplateRows: templateRows || undefined,
        gridTemplateAreas: templateAreas || undefined,
        alignItems: alignItems || undefined,
        justifyItems: justifyItems || undefined,
        ...style
      }}
      {...rest}
    >
      {children}
    </Component>
  )
}

const Grid = forwardRef(BaseGrid)

export default Object.assign(Grid as typeof BaseGrid, {
  Item: GridItem
})
