// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  CSSProperties,
  ElementType,
  forwardRef,
  ReactElement
} from 'react'
import './Box.scss'
import cn from 'classnames'
import { PolymorphicComponent, PolymorphicRef } from '~/src/utils/types'
import { Background, BorderRadius, BoxShadow, Padding } from './types'

export interface BoxProps {
  background?: Background
  padding?: Padding
  borderRadius?: BorderRadius
  boxShadow?: BoxShadow
}

function BaseBox<C extends ElementType = 'div'>(
  props: PolymorphicComponent<C, BoxProps>,
  ref: PolymorphicRef<C>
): ReactElement {
  const {
    className,
    children,
    as = 'div',
    padding,
    background,
    borderRadius,
    boxShadow,
    ...rest
  } = props
  const Component = as

  const styles = {
    padding: padding ? `var(--inf-spacing-${padding as string})` : false,
    borderRadius: borderRadius
      ? `var(--inf-border-radius-${borderRadius as string})`
      : false,
    boxShadow: boxShadow
      ? `var(--inf-box-shadow-${boxShadow as string})`
      : false,
    backgroundColor: background
      ? `var(--inf-color-background-${background as string})`
      : false
  }

  return (
    <Component
      ref={ref}
      className={cn('inf-box', className)}
      style={styles as CSSProperties}
      {...rest}
    >
      {children}
    </Component>
  )
}

export const Box = forwardRef(BaseBox) as typeof BaseBox
