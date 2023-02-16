import { CSSProperties, ReactElement } from 'react'
import cn from 'classnames'
import { BadgeProps } from 'Components/Badge/components/Badge'
import '../style/sup.scss'

export interface BadgeSupProps extends Omit<BadgeProps, ''> {
  standalone?: boolean
}

const BadgeSup = ({
  standalone = false,
  dot = false,
  badgeContent,
  tone = 'primary',
  offset,
  showZero = false
}: BadgeSupProps): ReactElement | null => {
  const title =
    typeof badgeContent === 'number' || typeof badgeContent === 'string'
      ? badgeContent.toString()
      : undefined
  const isZero = !badgeContent && Number.isInteger(badgeContent) && showZero
  const styles: CSSProperties = {
    right: `${-(offset as number[])?.[0]}px` || 0,
    top: `${(offset as number[])?.[1]}px` || 0
  }

  return badgeContent || isZero || dot ? (
    <sup
      title={title}
      className={cn('inf-badge-sup', `inf-badge-sup--tone-${tone as string}`, {
        'inf-badge-sup--standalone': standalone && !dot,
        'inf-badge-sup--dot': dot
      })}
      style={styles}
    >
      {dot ? null : badgeContent}
    </sup>
  ) : null
}

export default BadgeSup
