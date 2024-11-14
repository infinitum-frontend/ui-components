import React, { ComponentPropsWithoutRef } from 'react'
import './index.scss'
import cn from 'classnames'

export interface PageLayoutContentProps
  extends ComponentPropsWithoutRef<'main'> {
  className?: string
  centerContent?: boolean
  /**
   * Добавляется отступ снизу для компенсирования высоты bottomBar, который позиционируется над контентом
   */
  extraMarginBottomBar?: boolean
  /**
   * Убирает padding сверху
   */
  collapsePaddingTop?: boolean
  /**
   * Убирает padding снизу
   */
  collapsePaddingBottom?: boolean
}

const PageLayoutContent = React.forwardRef<HTMLElement, PageLayoutContentProps>(
  (
    {
      className,
      children,
      extraMarginBottomBar,
      collapsePaddingTop,
      collapsePaddingBottom,
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
          'inf-page-layout-content--extra-margin-bottom-bar':
            extraMarginBottomBar,
          'inf-page-layout-content--collapse-padding-top': collapsePaddingTop,
          'inf-page-layout-content--collapse-padding-bottom':
            collapsePaddingBottom
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
