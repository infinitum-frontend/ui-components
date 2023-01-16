import './index.scss'
import React, { HTMLAttributes, ReactNode } from 'react'

export interface BoxProps extends HTMLAttributes<any> {
  children?: ReactNode
  className?: string
  as?: React.ElementType
  background?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'success'
    | 'danger'
    | 'warning'
  foreground?: 'left' | 'center' | 'right'
}

const Box: React.FunctionComponent<BoxProps> = ({
  children = '',
  className = '',
  as = 'div',
  ...restProps
}) => {
  const Component = as

  return (
    <Component className={'inf-box'} {...restProps}>
      {children}
    </Component>
  )
}

Box.displayName = 'Box'

export default Box
