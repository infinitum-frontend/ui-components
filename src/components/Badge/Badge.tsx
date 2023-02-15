import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react'
import cn from 'classnames'
import './index.scss'

export interface BadgeProps extends ComponentPropsWithoutRef<'span'> {
  /** Отображается ли значение 0 */
  showZero?: boolean
  /** цветовая тема */
  tone?: 'primary' | 'secondary'
  /** контент для отображения в бейдже */
  badgeContent?: ReactNode
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      children,
      tone = 'primary',
      showZero = false,
      badgeContent,
      className,
      ...props
    },
    ref
  ) => {
    // standalone
    if (!children && badgeContent) {
      return (
        <sup
          className={cn(
            'inf-badge__sup',
            'inf-badge__sup--standalone',
            `inf-badge__sup--tone-${tone}`
          )}
        >
          {badgeContent}
        </sup>
      )
    }

    // with children
    return (
      <span ref={ref} className={cn('inf-badge', className)} {...props}>
        {children}
        {badgeContent && (
          <sup className={cn('inf-badge__sup', `inf-badge__sup--tone-${tone}`)}>
            {badgeContent}
          </sup>
        )}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

export default Badge
