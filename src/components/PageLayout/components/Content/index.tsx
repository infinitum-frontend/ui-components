import React, { ComponentPropsWithoutRef } from 'react'
import { Box, BoxProps } from 'Components/Box'
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
  /**
   * padding сверху
   */
  paddingTop?: BoxProps['paddingTop']
  /**
   * padding снизу
   */
  paddingBottom?: BoxProps['paddingBottom']
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
      paddingTop = 'xxlarge',
      paddingBottom = 'xxlarge',
      style
    },
    ref
  ) => {
    return (
      <Box
        ref={ref}
        as="main"
        className={cn('inf-page-layout-content', className, {
          'inf-page-layout-content--center-content': centerContent,
          'inf-page-layout-content--extra-margin-bottom-bar':
            extraMarginBottomBar
        })}
        paddingTop={collapsePaddingTop ? undefined : paddingTop}
        paddingBottom={collapsePaddingBottom ? undefined : paddingBottom}
        style={style}
      >
        {children}
      </Box>
    )
  }
)

PageLayoutContent.displayName = 'PageLayoutContent'

export default PageLayoutContent
