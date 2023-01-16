import './index.scss'
import React from 'react'
import cn from 'classnames'

export interface SkeletonProps {
  className?: string
  role?: string
}

const Skeleton: React.FunctionComponent<SkeletonProps> = ({
  className,
  role = 'skeleton'
}) => {
  return <div className={cn('inf-skeleton', className)} />
}

export default Skeleton
