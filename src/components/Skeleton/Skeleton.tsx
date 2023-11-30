import './Skeleton.scss'
import React, { CSSProperties } from 'react'
import cn from 'classnames'

export interface SkeletonProps {
  style?: CSSProperties
  className?: string
  role?: string
}

/** Компонент заполнитель, используемый для указания положения и макета контента, который загружается или еще не доступен */
const Skeleton: React.FunctionComponent<SkeletonProps> = ({
  style,
  className,
  role = 'skeleton'
}) => {
  return <div style={style} className={cn('inf-skeleton', className)} />
}

export default Skeleton
