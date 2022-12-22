import './index.scss'
import React, {
  ReactNode
} from 'react'
import classNames from 'classnames'

export interface InfBoxProps {
  children?: ReactNode
  className?: string
  as?: React.ElementType<any>
  background?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'danger' | 'warning'
  foreground?: 'left' | 'center' | 'right'
}

const InfBox: React.FunctionComponent<InfBoxProps> = ({
  children = '',
  className = '',
  as = 'div'
}) => {
  const getClassNames: () => string = () => {
    return classNames(
      'inf-box',
      className
    )
  }

  const Component = as

  return (
    <Component className={getClassNames()}>
      {children}
    </Component>
  )
}

InfBox.displayName = 'InfBox'

export default InfBox
