// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ElementType, forwardRef, ReactElement } from 'react'
import {
  PolymorphicComponent,
  PolymorphicRef,
  SpaceVariants
} from '~/src/utils/types'
import cn from 'classnames'
import './Card.scss'
import { Box, BoxProps } from '../Box'

type Size = 'medium' | 'large'

export interface CardProps {
  size?: Size
  variant?: 'shadow' | 'outline'
  outlineVariant?: 'danger'
  borderRadius?: BoxProps['borderRadius']
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
  return (
    // @ts-expect-error
    <Box
      ref={ref}
      className={cn('inf-card', className)}
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
    </Box>
  )
}

const Card = forwardRef(BaseCard)

export default Card as typeof BaseCard
