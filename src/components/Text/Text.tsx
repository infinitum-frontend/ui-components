import './Text.scss'
import React, {
  ReactNode
} from 'react'
import classNames from 'classnames'

export interface TextProps {
  children?: ReactNode
  className?: string
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'
  weight?: 'light' | 'normal' | 'bold' | 'extrabold'
  tone?: 'default' | 'secondary' | 'tertiary' | 'success' | 'danger' | 'warning'
  alignment?: 'left' | 'center' | 'right'
  truncated?: boolean
  uppercase?: boolean
}

const Text: React.FunctionComponent<TextProps> = ({
  children = '',
  className = '',
  size = 'medium',
  weight = 'normal',
  tone = 'default',
  alignment = 'left',
  truncated = false,
  uppercase = false
}) => {
  const getClassNames: () => string = () => {
    return classNames(
      'inf-text',
      className,
      `inf-text--size-${size}`,
      `inf-text--weight-${weight}`,
      `inf-text--tone-${tone}`,
      {
        'inf-text--uppercase': uppercase,
        'inf-text--truncated': truncated,
        [`inf-text--align-${alignment}`]: alignment !== 'left'
      }
    )
  }

  return (
    <div className={getClassNames()}>
      {children}
    </div>
  )
}

Text.displayName = 'Text'

export default Text
