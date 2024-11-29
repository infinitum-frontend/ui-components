// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  ReactElement,
  cloneElement,
  PropsWithChildren,
  Children,
  forwardRef,
  ComponentPropsWithoutRef
} from 'react'
import cn from 'classnames'
import './Icon.scss'

export interface IconProps extends PropsWithChildren {
  className?: string
  size?: 'small' | 'medium' | 'large'
  color?:
    | 'primary'
    | 'secondary'
    | 'primary-hover'
    | 'primary-disabled'
    | 'inverse'
    | 'on-color'
    | 'brand'
    | 'brand-secondary'
    | 'error'
    | 'warning'
    | 'success'
    | 'info'
    | 'info-disabled'
    | 'violet'
    | 'teal'
}

/** Обертка для отображения иконки со стилями дизайн-системы */
const Icon = forwardRef<
  SVGElement,
  ComponentPropsWithoutRef<'svg'> & IconProps
>(({ className, children, size, color, ...restProps }, ref) => {
  const classNames = cn('inf-icon', className, {
    [`inf-icon--size-${size as string}`]: size,
    [`inf-icon--color-${color as string}`]: color
  })

  if (children) {
    const child = Children.only(children) as ReactElement

    return cloneElement(child, {
      ref,
      className: classNames,
      ...restProps
    })
  }

  return <></>
})

Icon.displayName = 'Icon'

export default Icon
