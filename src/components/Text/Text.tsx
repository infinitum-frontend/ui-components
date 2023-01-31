import './Text.scss'
import React, { ReactNode } from 'react'
import classNames from 'classnames'

export interface TextProps extends React.ComponentPropsWithoutRef<'div'> {
  children?: ReactNode
  className?: string
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'
  weight?: 'light' | 'normal' | 'bold' | 'extrabold'
  tone?:
    | 'default'
    | 'secondary'
    | 'tertiary'
    | 'quaternary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'inverse'
  alignment?: 'left' | 'center' | 'right'
  truncated?: boolean
  uppercase?: boolean
}

const Text = React.forwardRef<HTMLDivElement, TextProps>(
  (
    {
      children = '',
      className = '',
      size = 'medium',
      weight = 'normal',
      alignment = 'left',
      tone,
      truncated = false,
      uppercase = false,
      ...props
    },
    ref
  ) => {
    const getClassNames: () => string = () => {
      return classNames(
        'inf-text',
        className,
        `inf-text--size-${size}`,
        `inf-text--weight-${weight}`,
        {
          'inf-text--uppercase': uppercase,
          'inf-text--truncated': truncated,
          [`inf-text--tone-${tone as string}`]: tone,
          [`inf-text--align-${alignment}`]: alignment !== 'left'
        }
      )
    }

    return (
      <div ref={ref} className={getClassNames()} {...props}>
        {children}
      </div>
    )
  }
)

Text.displayName = 'Text'

export default Text