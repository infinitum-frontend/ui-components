import { FC } from 'react'
import cls from 'classnames'
import PendingIndicator, {
  Size as PendingIndicatorSize,
  Theme as PendingIndicatorTheme
} from '../PendingIndicator'
import styles from './PendingContainer.module.css'

interface IPendingContainerProps {
  className?: string
  role?: string
  indicatorClassName?: string
  title?: string
  indicatorTheme?: PendingIndicatorTheme
  indicatorSize?: PendingIndicatorSize
}

const PendingContainer: FC<IPendingContainerProps> = ({
  className,
  role = 'pending-container',
  indicatorClassName,
  title = '',
  indicatorTheme = PendingIndicatorTheme.Brand,
  indicatorSize = PendingIndicatorSize.Medium
}) => (
  <section className={cls(className, styles.container)} role={role}>
    <div className={styles.overlay}>
      <PendingIndicator
        className={indicatorClassName}
        size={indicatorSize}
        theme={indicatorTheme}
      />
      {title.length > 0 && (
        <h3 className={styles.title} aria-label="pending-title">
          {title}
        </h3>
      )}
    </div>
  </section>
)

export default PendingContainer
