// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { CSSProperties, ReactElement, ReactNode } from 'react'
import { Text } from 'Components/Text'
import cn from 'classnames'
import { BadgeProps } from 'Components/Badge/Badge'
import './BadgeSup.scss'

export interface BadgeSupProps extends BadgeProps {
  standalone?: boolean
}

const BadgeSup = ({
  standalone = false,
  dot = false,
  count = 0,
  color = 'brand',
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
    <Text
      as="sup"
      variant="subtitle-3"
      title={count?.toString()}
      className={cn(
        'inf-badge-sup',
        `inf-badge-sup--tone-${tone as string}`,
        `inf-badge-sup--color-${color as string}`,
        {
          'inf-badge-sup--standalone': standalone,
          'inf-badge-sup--dot': dot
        }
      )}
      style={styles}
    >
      {dot ? null : getDisplayValue()}
    </Text>
  ) : null
}

export default BadgeSup
