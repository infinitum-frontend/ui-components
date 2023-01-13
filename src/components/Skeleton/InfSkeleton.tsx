import './index.scss'
import React from 'react'
import cn from 'classnames'

export interface InfSkeletonProps {
  className?: string
  role?: string
}

const InfSkeleton: React.FunctionComponent<InfSkeletonProps> = ({
  className,
  role = 'skeleton'
}) => {
  return <div className={cn('inf-skeleton', className)} />
}

export default InfSkeleton
