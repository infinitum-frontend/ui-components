import { ComponentPropsWithoutRef, forwardRef } from 'react'
import { Icon } from '~/src'
import classNames from 'classnames'
import './IconButton.scss'

export interface IconButtonProps extends ComponentPropsWithoutRef<'button'> {
  color:
    | 'primary'
    | 'info'
    | 'brand'
    | 'error'
    | 'warning'
    | 'success'
    | 'violet'
    | 'teal'
  contained?: boolean
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      color = 'primary',
      contained = false,
      size = 'medium',
      disabled = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={classNames(
          'inf-icon-button',
          {
            'inf-icon-button--contained': contained,
            'inf-icon-button--disabled': disabled,
            [`inf-icon-button--size-${size}`]: size,
            [`inf-icon-button--color-${color}`]: color
          },
          className
        )}
        ref={ref}
        {...props}
      >
        <Icon size={size} color={color}>
          {children}
        </Icon>
      </button>
    )
  }
)

IconButton.displayName = 'IconButton'

export default IconButton
