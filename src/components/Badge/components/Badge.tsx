import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react'
import cn from 'classnames'
import '../style/badge.scss'
import BadgeSup from './BadgeSup'

export interface BadgeProps {
  /** Отображается ли значение 0 */
  showZero?: boolean
  /** цветовая тема */
  tone?: 'primary' | 'secondary'
  /** контент для отображения в бейдже */
  badgeContent?: ReactNode
  /** отображать в виде точки */
  dot?: boolean
  /** Сдвиг по горизонтали и вертикали в пикселях. Работает только когда у компонента есть children */
  offset?: [number, number]
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
      badgeContent,
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
          badgeContent={badgeContent}
          offset={offset}
          tone={tone}
          dot={dot}
          showZero={showZero}
        />
      </span>
    )
  }
)

Badge.displayName = 'Badge'

export default Badge
