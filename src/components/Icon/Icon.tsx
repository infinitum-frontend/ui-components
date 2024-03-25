// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  ReactElement,
  cloneElement,
  PropsWithChildren,
  Children
} from 'react'
import cn from 'classnames'
import './Icon.scss'

export interface IconProps extends PropsWithChildren {
  className?: string
  size?: 'small' | 'medium' | 'large'
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
  children,
  size,
  color,
  ...restProps
}: IconProps): ReactElement => {
  const classNames = cn('inf-icon', className, {
    [`inf-icon--size-${size as string}`]: size,
    [`inf-icon--color-${color as string}`]: color
  })

  if (children) {
    const child = Children.only(children) as ReactElement

    return cloneElement(child, {
      className: classNames,
      ...restProps
    })
  }

  return <></>
}

Icon.displayName = 'Icon'

export default Icon
