import './index.scss'
import React, {
  ReactNode
} from 'react'
import classNames from 'classnames'

export interface InfTextProps {
  children?: ReactNode
  className?: string
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'
  weight?: 'light' | 'normal' | 'bold'
  tone?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'danger' | 'warning'
  isTruncated?: boolean
  isUppercase?: boolean
}

const InfText: React.FunctionComponent<InfTextProps> = ({
  children = '',
  className = '',
  size = 'medium',
  weight = 'normal',
  tone = 'primary',
  isTruncated = false,
  isUppercase = false
}) => {
  const getClassNames: () => string = () => {
    return classNames(
      'inf-text',
      className,
      `inf-text--size-${size}`,
      `inf-text--weight-${weight}`,
      `inf-text--tone-${tone}`,
      {
        'inf-text--uppercase': isUppercase,
        'inf-text--truncated': isTruncated
      }
    )
  }

  return (
    <div className={getClassNames()}>
      {children}
    </div>
  )
}

InfText.displayName = 'InfText'

export default InfText
