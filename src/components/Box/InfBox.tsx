// import './index.scss'
import styles from './InfBox.module.scss'
import React, {
  HTMLAttributes,
  ReactNode
} from 'react'
import classNames from 'classnames'

export interface InfBoxProps extends HTMLAttributes<any> {
  children?: ReactNode
  className?: string
  as?: React.ElementType<any>
  background?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'danger' | 'warning'
  foreground?: 'left' | 'center' | 'right'
}

const InfBox: React.FunctionComponent<InfBoxProps> = ({
  children = '',
  className = '',
  as = 'div',
  ...restProps
}) => {
  const getClassNames: () => string = () => {
    return classNames(
      'inf-box',
      className
    )
  }

  const Component = as

  return (
    <Component className={styles.infBox} {...restProps}>
      {children}
    </Component>
  )
}

InfBox.displayName = 'InfBox'

export default InfBox
