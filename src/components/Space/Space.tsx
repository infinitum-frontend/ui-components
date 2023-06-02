import './Space.scss'
import React, { ElementType } from 'react'
import cn from 'classnames'
import {
  PolymorphicComponent,
  PolymorphicComponentWithRef,
  PolymorphicRef
} from '~/src/utils/types'

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
   * Разделитель
   */
  // TODO: divider?: React.ReactNode
  /**
   * На всю ширину контейнера
   */
  fullWidth?: boolean
}

const Space: PolymorphicComponentWithRef<'div', SpaceProps> = React.forwardRef(
  <C extends ElementType = 'div'>(
    {
      as,
      children,
      className,
      gap = 'small',
      direction = 'vertical',
      align,
      justify,
      fullWidth = false,
      wrap = false,
      ...props
    }: PolymorphicComponent<C, SpaceProps>,
    ref: PolymorphicRef<C>
  ) => {
    const getClassNames: () => string = () => {
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

    const Component = as || 'div'

    return (
      <Component ref={ref} className={getClassNames()} {...props}>
        {children}
      </Component>
    )
  }
)

Space.displayName = 'Space'

/** Компонент для вертикальной и горизонтальной раскладки элементов */
export default Space

// TODO: gapX, gapY
