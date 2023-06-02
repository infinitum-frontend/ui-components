// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  ReactElement,
  ReactNode,
  ComponentPropsWithoutRef,
  isValidElement
} from 'react'
import cn from 'classnames'
import './StatusView.scss'

export interface StatusViewProps extends ComponentPropsWithoutRef<'div'> {
  className?: string
  role?: 'alert' | 'status'
  title?: string
  icon?: ReactNode
}

/** Компонент для отображения статуса */
const StatusView = ({
  className,
  children,
  role = 'status',
  icon,
  title = '',
  ...props
}: StatusViewProps): ReactElement => {
  return (
    <div className={cn('inf-status-view', className)} role={role} {...props}>
      {isValidElement(icon) && (
        <div className="inf-status-view__icon">{icon}</div>
      )}
      {title.length > 0 && <h3 className="inf-status-view__title">{title}</h3>}
      {children}
    </div>
  )
}

export default StatusView
