import './Space.scss'
import React, { ReactNode } from 'react'
import cn from 'classnames'

export interface SpaceProps extends React.ComponentPropsWithoutRef<'div'> {
  /**
   * Элемент для рендеринга
   * @default 'button'
   */
  as?: React.ElementType<any>
  /**
   * Содержимое
   */
  children: ReactNode
  /**
   * Дополнительный className
   */
  className?: string
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

const Space = React.forwardRef<HTMLDivElement, SpaceProps>(
  (
    {
      as = 'div',
      children = '',
      className = '',
      gap = 'small',
      direction = 'vertical',
      align,
      wrap = false,
      ...props
    },
    ref
  ) => {
    const getClassNames: () => string = () => {
      return cn(
        'inf-space',
        className,
        `inf-space--gap-${gap}`,
        `inf-space--direction-${direction}`,
        {
          'inf-space--wrap': wrap,
          [`inf-space--align-${align as string}`]: align
        }
      )
    }

    const Component = as

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
