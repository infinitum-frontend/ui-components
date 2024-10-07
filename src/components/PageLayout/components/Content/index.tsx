import React, { ComponentPropsWithoutRef } from 'react'
import './index.scss'
import cn from 'classnames'

export interface PageLayoutContentProps
  extends ComponentPropsWithoutRef<'main'> {
  className?: string
  centerContent?: boolean
  extraPaddingBottom?: boolean
  collapsePaddingTop?: boolean
}

const PageLayoutContent = React.forwardRef<HTMLElement, PageLayoutContentProps>(
  (
    {
      className,
      children,
      extraPaddingBottom,
      collapsePaddingTop,
      centerContent,
      ...props
    },
    ref
  ) => {
    return (
      <main
        ref={ref}
        className={cn('inf-page-layout-content', className, {
          'inf-page-layout-content--center-content': centerContent,
          'inf-page-layout-content--extra-padding-bottom': extraPaddingBottom,
          'inf-page-layout-content--collapse-padding-top': collapsePaddingTop
        })}
        {...props}
      >
        {children}
      </main>
    )
  }
)

PageLayoutContent.displayName = 'PageLayoutContent'

export default PageLayoutContent
