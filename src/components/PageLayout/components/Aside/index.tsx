import React, { ComponentPropsWithoutRef } from 'react'
import './index.scss'
import cn from 'classnames'

export interface PageLayoutAsideProps
  extends ComponentPropsWithoutRef<'aside'> {
  className?: string
  collapsible?: boolean
  collapsed?: boolean
  hasDivider?: boolean
}

const PageLayoutAside = React.forwardRef<HTMLElement, PageLayoutAsideProps>(
  (
    { className, children, collapsible = false, collapsed = false, ...props },
    ref
  ) => {
    return (
      <aside
        ref={ref}
        className={cn('inf-page-layout-aside', className, {
          'inf-page-layout-aside--collapsed': collapsed
        })}
        {...props}
      >
        {collapsible && <button>Collapse</button>}
        {children}
      </aside>
    )
  }
)

PageLayoutAside.displayName = 'PageLayoutAside'

export default PageLayoutAside
