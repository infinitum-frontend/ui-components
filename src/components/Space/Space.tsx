// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ElementType, forwardRef, ReactElement } from 'react'
import cn from 'classnames'
import { PolymorphicComponent, PolymorphicRef } from '~/src/utils/types'
import { Gap, Direction, Align, Justify } from './enums'
import './Space.scss'

export interface SpaceProps {
  /**
   * Расстояние между блоками
   */
  gap?: Gap
  /**
   * Направление раскладки
   */
  direction?: Direction
  /**
   * Выравние по оси (Flexbox align-items)
   */
  align?: Align
  /**
   * Выравние по оси (Flexbox justify-content)
   */
  justify?: Justify
  /**
   * Перенос на новый ряд при переполнении (Flexbox wrap)
   */
  wrap?: boolean
  /**
   * Разделитель
   */
  // TODO: divider?: React.ReactNode
  /**
   * На всю ширину контейнера
   */
  fullWidth?: boolean
}

// TODO: gapX, gapY
function BaseSpace<C extends ElementType = 'div'>(
  props: PolymorphicComponent<C, SpaceProps>,
  ref: PolymorphicRef<C>
): ReactElement {
  // пропы деструктурируем в теле компонента, тк в аргументах функции это ломает отображение таблицы пропов
  const {
    as = 'div',
    className,
    gap = Gap.Medium,
    direction = Direction.Vertical,
    wrap,
    fullWidth,
    align,
    justify,
    children,
    ...rest
  } = props
  const getClassNames = (): string => {
    return cn(
      'inf-space',
      className,
      `inf-space--gap-${gap as string}`,
      `inf-space--direction-${direction as string}`,
      {
        'inf-space--wrap': wrap,
        'inf-space--full-width': fullWidth,
        [`inf-space--align-${align as string}`]: align,
        [`inf-space--justify-${justify as string}`]: justify
      }
    )
  }

  const Component = as

  return (
    <Component ref={ref} className={getClassNames()} {...rest}>
      {children}
    </Component>
  )
}

// We use typecasting to force args table to show up in Storybook
// Экспорт именнованный, тк с дефолтным пропы отказываются появляться(https://github.com/storybookjs/storybook/issues/9556)
/** Компонент для вертикальной и горизонтальной раскладки элементов */
export const Space = Object.assign(forwardRef(BaseSpace) as typeof BaseSpace, {
  Gap,
  Direction,
  Align,
  Justify
})
