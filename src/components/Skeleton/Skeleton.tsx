import './index.scss'
import React from 'react'
import cn from 'classnames'

export interface SkeletonProps {
  className?: string
  role?: string
}

/** Компонент заполнитель, используемый для указания положения и макета контента, который загружается или еще не доступен */
const Skeleton: React.FunctionComponent<SkeletonProps> = ({
  className,
  role = 'skeleton'
}) => {
  return <div className={cn('inf-skeleton', className)} />
}

export default Skeleton
