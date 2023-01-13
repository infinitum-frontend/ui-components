import './Space.scss'
import React, {
  ReactNode
} from 'react'
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
  children?: ReactNode
  className?: string
  gap?: 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'
  direction?: 'vertical' | 'horizontal'
  align?: 'baseline' | 'start' | 'end' | 'center'
  wrap?: boolean
}

const Space = React.forwardRef<HTMLDivElement, SpaceProps>(({
  children = '',
  className = '',
  gap = 'small',
  direction = 'horizontal',
  align,
  wrap = false
}, ref) => {
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

  return (
    <div ref={ref} className={getClassNames()}>
      {children}
    </div>
  )
})

Space.displayName = 'Space'

export default Space
