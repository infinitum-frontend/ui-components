import './Space.scss'
import React, {
  ReactNode
} from 'react'
import cn from 'classnames'

export interface SpaceProps {
  children?: ReactNode
  className?: string
  gap?: 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'
  direction?: 'vertical' | 'horizontal'
  align?: 'baseline' | 'start' | 'end' | 'center'
  wrap?: boolean
}

const Space: React.FunctionComponent<SpaceProps> = ({
  children = '',
  className = '',
  gap = 'small',
  direction = 'horizontal',
  align,
  wrap = false
}) => {
  const getClassNames: () => string = () => {
    return cn(
      'inf-space',
      className,
      `inf-space--gap-${gap}`,
      `inf-space--direction-${direction}`,
      {
        'inf-space--wrap': wrap,
        [`inf-space--align-${align}`]: align
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
