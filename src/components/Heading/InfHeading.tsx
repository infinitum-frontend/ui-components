import './index.scss'
import React, {
  ReactNode
} from 'react'
import classNames from 'classnames'

export interface InfHeadingProps {
  children?: ReactNode
  className?: string
  level?: 1 | 2 | 3 | 4 | 5 | 6
  weight?: 'light' | 'normal' | 'bold'
  alignment?: 'left' | 'center' | 'right'
  isTruncated?: boolean
  isUppercase?: boolean
}

const InfHeading: React.FunctionComponent<InfHeadingProps> = ({
  children = '',
  className = '',
  level = 1,
  weight = 'bold',
  alignment = 'left',
  isTruncated = false,
  isUppercase = false
}) => {
  const getClassNames: () => string = () => {
    return classNames(
      'inf-heading',
      className,
      `inf-heading--level-${level}`,
      `inf-heading--weight-${weight}`,
      {
        'inf-heading--uppercase': isUppercase,
        'inf-heading--truncated': isTruncated,
        [`inf-heading--align-${alignment}`]: alignment !== 'left'
      }
    )
  }

  const LEVEL_MAP: { 1: 'h1', 2: 'h2', 3: 'h3', 4: 'h4', 5: 'h5', 6: 'h6' } = {
    1: 'h1',
    2: 'h2',
    3: 'h3',
    4: 'h4',
    5: 'h5',
    6: 'h6'
  }

  const Component = LEVEL_MAP[level]

  return (
    <Component className={getClassNames()}>
      {children}
    </Component>
  )
}

InfHeading.displayName = 'InfHeading'

export default InfHeading
