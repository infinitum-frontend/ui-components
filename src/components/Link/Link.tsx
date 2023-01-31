import React, { ReactNode } from 'react'
import classNames from 'classnames'
import './Link.scss'

export interface LinkProps extends React.ComponentPropsWithoutRef<'a'> {
  /**
   * Элемент для рендеринга
   * @default 'button'
   */
  as?: React.ElementType<any>
  children: ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'text'
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ as = 'a', children = '', className = '', ...props }, ref) => {
    const getClassNames: () => string = () => {
      return classNames('inf-link', className)
    }

    const Component = as

    return (
      <Component ref={ref} className={getClassNames()} {...props}>
        {children}
      </Component>
    )
  }
)

Link.displayName = 'Link'

export default Link