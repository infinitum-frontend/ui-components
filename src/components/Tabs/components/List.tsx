// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ComponentPropsWithoutRef, ReactElement } from 'react'
import useTabsContext from 'Components/Tabs/context/useTabsContext'
import cn from 'classnames'
import '../style/list.scss'

export interface TabListProps extends ComponentPropsWithoutRef<'div'> {}

const TabList = ({
  children,
  className,
  ...props
}: TabListProps): ReactElement => {
  const { variant } = useTabsContext()
  return (
    <div
      className={cn(
        'inf-tab-list',
        className,
        `inf-tab-list--variant-${variant as string}`
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default TabList
