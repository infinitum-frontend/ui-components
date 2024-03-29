// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  CSSProperties,
  ElementType,
  forwardRef,
  ReactElement
} from 'react'
import cn from 'classnames'
import { PolymorphicComponent, PolymorphicRef } from '~/src/utils/types'
import { BoxProps } from './types'
import './Box.scss'

function BaseBox<C extends ElementType = 'div'>(
  props: PolymorphicComponent<C, BoxProps>,
  ref: PolymorphicRef<C>
): ReactElement {
  const {
    className,
    children,
    as = 'div',
    padding,
    paddingX,
    paddingY,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    background,
    color,
    borderColor,
    borderWidth,
    borderTopWidth,
    borderBottomWidth,
    borderRightWidth,
    borderLeftWidth,
    borderRadius,
    boxShadow,
    overflow,
    overflowX,
    overflowY,
    cursor,
    width,
    height,
    maxWidth,
    maxHeight,
    minWidth,
    minHeight,
    style,
    ...rest
  } = props
  const Component = as

  const borderStyleValue =
    borderColor ||
    borderWidth ||
    borderTopWidth ||
    borderBottomWidth ||
    borderLeftWidth ||
    borderRightWidth
      ? 'solid'
      : undefined

  const styles = {
    borderStyle: borderStyleValue,
    borderColor: borderColor
      ? `var(--inf-color-border-${borderColor as string})`
      : undefined,
    borderWidth: borderWidth
      ? `var(--inf-border-width-${borderWidth as string})`
      : undefined,
    borderRadius: borderRadius
      ? `var(--inf-border-radius-${borderRadius as string})`
      : undefined,
    boxShadow: boxShadow
      ? `var(--inf-box-shadow-${boxShadow as string})`
      : undefined,
    backgroundColor: background
      ? `var(--inf-color-background-${background as string})`
      : undefined,
    color: background ? `var(--inf-color-text-${color as string})` : undefined,
    overflowX: overflowX || overflow || undefined,
    overflowY: overflowY || overflow || undefined,
    cursor: cursor || undefined,
    paddingTop: paddingTop
      ? `var(--inf-space-${paddingTop as string})`
      : undefined || paddingY
      ? `var(--inf-space-${paddingY as string})`
      : undefined || padding
      ? `var(--inf-space-${padding as string})`
      : undefined || undefined,
    paddingBottom: paddingBottom
      ? `var(--inf-space-${paddingBottom as string})`
      : undefined || paddingY
      ? `var(--inf-space-${paddingY as string})`
      : undefined || padding
      ? `var(--inf-space-${padding as string})`
      : undefined || undefined,
    paddingLeft: paddingLeft
      ? `var(--inf-space-${paddingLeft as string})`
      : undefined || paddingX
      ? `var(--inf-space-${paddingX as string})`
      : undefined || padding
      ? `var(--inf-space-${padding as string})`
      : undefined || undefined,
    paddingRight: paddingRight
      ? `var(--inf-space-${paddingRight as string})`
      : undefined || paddingX
      ? `var(--inf-space-${paddingX as string})`
      : undefined || padding
      ? `var(--inf-space-${padding as string})`
      : undefined || undefined,
    width: width || undefined,
    height: height || undefined,
    maxWidth: maxWidth || undefined,
    maxHeight: maxHeight || undefined,
    minWidth: minWidth || undefined,
    minHeight: minHeight || undefined,
    ...style
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

const Box = forwardRef(BaseBox)

export default Box as typeof BaseBox
