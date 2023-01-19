import './index.scss'
import React, { ComponentPropsWithoutRef, ReactNode } from 'react'
import classNames from 'classnames'

// TODO: добавить as

export interface HeadingProps extends ComponentPropsWithoutRef<any> {
  children?: ReactNode
  className?: string
  level?: '1' | '2' | '3' | '4' | '5'
  weight?: 'light' | 'normal' | 'bold' | 'extrabold'
  align?: 'left' | 'center' | 'right'
  truncated?: boolean
  uppercase?: boolean
  hasMargin?: boolean
}

const Heading = React.forwardRef<HTMLDivElement, HeadingProps>(
  (
    {
      children = '',
      className = '',
      level = '3',
      weight = 'bold',
      align = 'left',
      truncated = false,
      uppercase = false,
      hasMargin = false,
      ...props
    },
    ref
  ) => {
    const getClassNames: () => string = () => {
      return classNames(
        'inf-heading',
        className,
        `inf-heading--level-${level}`,
        `inf-heading--weight-${weight}`,
        {
          'inf-heading--uppercase': uppercase,
          'inf-heading--truncated': truncated,
          'inf-heading--has-margin': hasMargin,
          [`inf-heading--align-${align}`]: align !== 'left'
        }
      )
    }

    const LEVEL_MAP: { 1: 'h1'; 2: 'h2'; 3: 'h3'; 4: 'h4'; 5: 'h5'; 6: 'h6' } =
      {
        1: 'h1',
        2: 'h2',
        3: 'h3',
        4: 'h4',
        5: 'h5',
        6: 'h6'
      }

    const Component = LEVEL_MAP[level]

    return (
      <Component ref={ref} className={getClassNames()} {...props}>
        {children}
      </Component>
    )
  }
)

Heading.displayName = 'Heading'

Heading.defaultProps = {
  level: '3',
  weight: 'bold'
}

export default Heading
