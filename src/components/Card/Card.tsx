// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ElementType, forwardRef, ReactElement } from 'react'
import {
  PolymorphicComponent,
  PolymorphicRef,
  SpaceVariants
} from '~/src/utils/types'
import cn from 'classnames'
import './Card.scss'
import { BoxProps } from '../Box'

type Size = 'medium' | 'large'

export interface CardProps {
  size?: Size
  variant?: 'shadow' | 'outline'
  outlineVariant?: 'danger'
  borderRadius?: BoxProps['borderRadius']
  hoverable?: boolean
  disabled?: boolean
}

function BaseCard<C extends ElementType = 'div'>(
  props: PolymorphicComponent<C, CardProps>,
  ref: PolymorphicRef<C>
): ReactElement {
  const {
    children,
    className,
    as = 'div',
    size = 'medium',
    variant = 'outline',
    outlineVariant,
    borderRadius,
    disabled,
    hoverable,
    ...rest
  } = props

  const sizeToPadding: Record<Size, SpaceVariants> = {
    medium: 'medium',
    large: 'large'
  }

  let borderWidth: BoxProps['borderWidth']
  let borderColor: BoxProps['borderColor']

  if (variant === 'outline') {
    borderWidth = 'default'
    borderColor = 'default'
  }

  if (outlineVariant === 'danger') {
    borderWidth = 'thick'
    borderColor = 'danger'
  }

  const Component = as

  return (
    <Component
      ref={ref}
      className={cn(
        'inf-card',
        className,
        `inf-button--variant-${variant as string}`,
        {
          'inf-card--hoverable': hoverable,
          'inf-card--didabled': disabled
        }
      )}
      as={as}
      boxShadow={variant === 'outline' ? undefined : 'medium'}
      borderRadius={borderRadius}
      background="default"
      padding={sizeToPadding[size]}
      borderWidth={borderWidth}
      borderColor={borderColor}
      {...rest}
    >
      {children}
    </Component>
  )
}

const Card = forwardRef(BaseCard)

export default Card as typeof BaseCard
