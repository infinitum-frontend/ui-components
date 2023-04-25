// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { forwardRef, ReactNode, ComponentPropsWithoutRef } from 'react'
import cn from 'classnames'
import '../style/badge.scss'
import BadgeSup from './BadgeSup'

export interface BadgeProps {
  /** Отображается ли значение 0 */
  showZero?: boolean
  /** цветовая тема */
  tone?: 'primary' | 'secondary'
  /** контент для отображения в бейдже */
  count?: ReactNode
  /** отображать в виде точки */
  dot?: boolean
  /** Сдвиг по горизонтали и вертикали в пикселях. Работает только когда у компонента есть children */
  offset?: [number, number]
  /** Максимальное отображаемое значение. Работает, только если badgeContent имеет тип number */
  maxCount?: number
}

const Badge = forwardRef<
  HTMLSpanElement,
  ComponentPropsWithoutRef<'span'> & BadgeProps
>(
  (
    {
      children,
      tone = 'primary',
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
