// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ElementType, forwardRef, ReactElement } from 'react'
import cn from 'classnames'
import { PolymorphicComponent, PolymorphicRef } from '~/src/utils/types'
import './Space.scss'

export interface SpaceProps {
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
   * Направление раскладки
   */
  direction?: 'vertical' | 'horizontal'
  /**
   * Выравние по оси (Flexbox align-items)
   */
  align?: 'baseline' | 'start' | 'end' | 'center'
  /**
   * Выравние по оси (Flexbox justify-content)
   */
  justify?: 'center' | 'start' | 'end' | 'space-between' | 'space-around'
  /**
   * Перенос на новый ряд при переполнении (Flexbox wrap)
   */
  wrap?: boolean
  /**
   * На всю ширину контейнера (width: 100%)
   */
  fullWidth?: boolean
  /**
   * На всю высоту контейнера (height: 100%)
   */
  fullHeight?: boolean
}

function BaseSpace<C extends ElementType = 'div'>(
  props: PolymorphicComponent<C, SpaceProps>,
  ref: PolymorphicRef<C>
): ReactElement {
  // пропы деструктурируем в теле компонента, тк в аргументах функции это ломает отображение таблицы пропов
  const {
    as = 'div',
    className,
    gap = 'medium',
    direction = 'vertical',
    wrap,
    fullWidth,
    fullHeight,
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
        'inf-space--full-height': fullHeight,
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

const Space = forwardRef(BaseSpace)

// We use typecasting to force args table to show up in Storybook
// Экспорт именнованный, тк с дефолтным пропы отказываются появляться(https://github.com/storybookjs/storybook/issues/9556)
/** Компонент для вертикальной и горизонтальной раскладки элементов */
export default Space as typeof BaseSpace
