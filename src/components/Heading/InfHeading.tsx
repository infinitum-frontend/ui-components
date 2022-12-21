import React, { ReactNode } from 'react'

export interface IHeadingProps {
  children?: ReactNode
  level?: number
  as?: ReactNode
  onClick?: () => void
}

// type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

const Heading: React.FunctionComponent<IHeadingProps> = props => {
  const {
    children,
    level = 1,
    as,
    onClick
  } = props

  const Component = 'h1'
  
  return (
    <Component onClick={onClick}
               className={`inf-button ui-button--level-${level}`}>{children}
    </Component>
  )
}

export default Heading
