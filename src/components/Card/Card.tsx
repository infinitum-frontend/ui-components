import React, { ReactNode } from 'react'
import cn from 'classnames'
import './Card.scss'

export interface CardProps extends React.ComponentPropsWithoutRef<'div'> {
  /**
   * Элемент для рендеринга
   * @default 'button'
   */
  as?: React.ElementType<any>
  /**
   * Содержимое
   */
  children?: ReactNode
  /**
   * Дополнительный className
   */
  className?: string
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, as = 'div', ...props }, ref) => {
    const Component = as

    return (
      <Component ref={ref} className={cn('inf-card', className)} {...props}>
        {children}
      </Component>
    )
  }
)

Card.displayName = 'Card'

export default Card
