// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ComponentPropsWithoutRef, ReactElement } from 'react'
import cn from 'classnames'
import './TabList.scss'

export interface TabListProps extends ComponentPropsWithoutRef<'div'> {}

const TabList = ({
  children,
  className,
  ...props
}: TabListProps): ReactElement => {
  return (
    <div className={cn('inf-tab-list', className)} {...props}>
      {children}
    </div>
  )
}

export default TabList
