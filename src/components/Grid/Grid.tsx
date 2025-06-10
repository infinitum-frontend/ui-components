// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  CSSProperties,
  ElementType,
  forwardRef,
  ReactElement
} from 'react'
import cn from 'classnames'
import { PolymorphicComponent, PolymorphicRef } from '~/src/utils/types'
import './Grid.scss'

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
   * CSS свойство grid-template-columns
   */
  templateRows?: CSSProperties['gridTemplateRows']
  /**
   * CSS свойство align-items
   */
  alignItems?: CSSProperties['alignItems']
  /**
   * CSS свойство justify-items
   */
  justifyItems?: CSSProperties['justifyItems']
}

function BaseGrid<C extends ElementType = 'div'>(
  props: PolymorphicComponent<C, GridProps>,
  ref: PolymorphicRef<C>
): ReactElement {
  // пропы деструктурируем в теле компонента, тк в аргументах функции это ломает отображение таблицы пропов
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
          [`
        inf-grid--row-gap-${rowGap as string}`]: rowGap,
          [`
        inf-grid--column-gap-${columnGap as string}`]: columnGap
        },
        `inf-grid--gap-${gap as string}`
      )}
      style={{
        '--minimum': min,
        '--row-fill-method': rowFillMethod,
        gridTemplateColumns: templateColumns || undefined,
        gridTemplateRows: templateRows || undefined,
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

// We use typecasting to force args table to show up in Storybook
// Экспорт именнованный, тк с дефолтным пропы отказываются появляться(https://github.com/storybookjs/storybook/issues/9556)
/** Компонент для раскладки элементов по сетке CSS Grid */
export default Grid as typeof BaseGrid
