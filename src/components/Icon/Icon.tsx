// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  ReactElement,
  cloneElement,
  ComponentPropsWithoutRef,
  CSSProperties
} from 'react'
import cn from 'classnames'
import './Icon.scss'

const sizeVariants = ['small', 'medium', 'large'] as const

type Size = (typeof sizeVariants)[number]

export interface IconProps extends ComponentPropsWithoutRef<'svg'> {
  className?: string
  icon: ReactElement
  size?: Size | CSSProperties['width'] | CSSProperties['height']
  color?:
    | 'primary'
    | 'secondary'
    | 'inverse'
    | 'error'
    | 'warning'
    | 'success'
    | 'info'
}

/** Обертка для отображения иконки со стилями дизайн-системы */
const Icon = ({
  className,
  icon,
  size,
  color,
  ...restProps
}: IconProps): ReactElement => {
  const isCustomSize = size ? !sizeVariants.includes(size as Size) : false

  const widthHeightProps = isCustomSize
    ? {
        width: size,
        height: size
      }
    : {}

  const classNames = cn('inf-icon', className, {
    [`inf-icon--size-${size as string}`]: size,
    [`inf-icon--color-${color as string}`]: color
  })

  if (icon) {
    return cloneElement(icon, {
      className: classNames,
      ...widthHeightProps,
      ...restProps
    })
  }

  return <></>
}

Icon.displayName = 'Icon'

export default Icon
