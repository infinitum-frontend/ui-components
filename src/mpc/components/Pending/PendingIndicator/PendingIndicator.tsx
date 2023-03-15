import { FC } from 'react'
import cls from 'classnames'

import { Size, Theme } from './constants'
import styles from './PendingIndicator.module.css'

interface IPendingIndicatorProps {
  className?: string
  theme?: Theme
  size?: Size
}

const PendingIndicator: FC<IPendingIndicatorProps> = ({
  className,
  size = Size.Medium,
  theme = Theme.Brand
}) => (
  <div
    role="progressbar"
    className={cls(
      styles.indicator,
      className,
      styles[size],
      styles[theme],
      styles[`${size}Icon`]
    )}
  />
)

export default PendingIndicator
