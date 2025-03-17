// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { forwardRef, ReactNode, ComponentPropsWithoutRef } from 'react'
import cn from 'classnames'
import './badge.scss'
import BadgeSup from './components/BadgeSup'

export type BadgeColor =
  | 'brand'
  | 'info'
  | 'success'
  | 'error'
  | 'warning'
  | 'violet'
  | 'teal'
  | 'brand-secondary'
  | 'info-secondary'
  | 'success-secondary'
  | 'error-secondary'
  | 'warning-secondary'
  | 'violet-secondary'
  | 'teal-secondary'

export interface BadgeProps {
  /** Отображается ли значение 0 */
  showZero?: boolean
  /**
   * @deprecated
   * цветовая тема */
  tone?: 'primary' | 'secondary'
  /** Цветовая тема */
  color?: BadgeColor
  /** контент для отображения в бейдже */
  count?: ReactNode
  /** отображать в виде точки */
  dot?: boolean
  /** Сдвиг по горизонтали и вертикали в пикселях. Работает только когда у компонента есть children */
  offset?: [number, number]
  /** Максимальное отображаемое значение. Работает, только если badgeContent имеет тип number */
  maxCount?: number
}

/** Компонент для отображения числовых значений и привлечения внимания к важным показателям */
const Badge = forwardRef<
  HTMLSpanElement,
  ComponentPropsWithoutRef<'span'> & BadgeProps
>(
  (
    {
      children,
      tone = 'primary',
      color = 'brand',
      showZero = false,
      dot = false,
      offset,
      count,
      maxCount,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <span ref={ref} className={cn('inf-badge', className)} {...props}>
        {children}
        <BadgeSup
          standalone={!children}
          count={count}
          offset={offset}
          color={color}
          tone={tone}
          dot={dot}
          maxCount={maxCount}
          showZero={showZero}
        />
      </span>
    )
  }
)

Badge.displayName = 'Badge'

export default Badge
