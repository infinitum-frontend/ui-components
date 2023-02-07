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
  gap?: 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'
  /**
   * Направление раскладки
   */
  direction?: 'vertical' | 'horizontal'
  /**
   * Выравние по оси (Flexbox align-items)
   */
  align?: 'baseline' | 'start' | 'end' | 'center'
  /**
   * Перенос на новый ряд при переполнении (Flexbox wrap)
   */
  wrap?: boolean
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
          [`inf-space--align-${align as string}`]: align
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

export default Space

// TODO: gapX, gapY
