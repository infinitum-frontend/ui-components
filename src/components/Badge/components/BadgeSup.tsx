// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { CSSProperties, ReactElement, ReactNode } from 'react'
import cn from 'classnames'
import { BadgeProps } from 'Components/Badge/Badge'
import './BadgeSup.scss'

export interface BadgeSupProps extends Omit<BadgeProps, ''> {
  standalone?: boolean
}

const BadgeSup = ({
  standalone = false,
  dot = false,
  count = 0,
  tone = 'primary',
  offset,
  maxCount = 0,
  showZero = false
}: BadgeSupProps): ReactElement | null => {
  const isZero = !count && showZero

  const getDisplayValue = (): ReactNode => {
    const countAsNumber = Number(count)
    if (Number.isNaN(countAsNumber) || !maxCount) {
      return count
    }

    return maxCount >= countAsNumber ? count : `${maxCount as number}+`
  }

  const styles: CSSProperties = {
    right: `${-Number((offset as number[])?.[0]) || 0}px`,
    top: `${Number((offset as number[])?.[1]) || 0}px`
  }

  return count || isZero || dot ? (
    <sup
      title={count?.toString()}
      className={cn('inf-badge-sup', `inf-badge-sup--tone-${tone as string}`, {
        'inf-badge-sup--standalone': standalone && !dot,
        'inf-badge-sup--dot': dot
      })}
      style={styles}
    >
      {dot ? null : getDisplayValue()}
    </sup>
  ) : null
}

export default BadgeSup
