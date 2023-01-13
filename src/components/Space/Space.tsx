import './Space.scss'
import React, {
  ReactNode
} from 'react'
import cn from 'classnames'

export interface SpaceProps {
  children?: ReactNode
  className?: string
  gap?: 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'
  wrap?: boolean
}

const Space: React.FunctionComponent<SpaceProps> = ({
  children = '',
  className = '',
  gap = 'medium',
  wrap = false
}) => {
  const getClassNames: () => string = () => {
    return cn(
      'inf-space',
      className,
      `inf-space--gap-${gap}`,
      {
        'inf-space--wrap': wrap
      }
    )
  }

  return (
    <div className={getClassNames()}>
      {children}
    </div>
  )
}

Space.displayName = 'Space'

export default Space
