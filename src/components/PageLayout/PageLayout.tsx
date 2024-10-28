import React, { ComponentPropsWithoutRef, useContext } from 'react'
import cn from 'classnames'
import PageLayoutAside from './components/Aside'
import PageLayoutBody from './components/Body'
import PageLayoutContent from './components/Content'
import PageLayoutHeader from './components/Header'
import PageLayoutBottomBar from './components/BottomBar'
import './PageLayout.scss'
import PageLayoutFooter from './components/Footer'
import { ThemePickerContext } from '../ThemePicker'

export interface PageLayoutProps extends ComponentPropsWithoutRef<'div'> {
  className?: string
}

// TODO:
// Body: padding, containerWidth
// BottomBar: padding for main content
// BottomBar, Header: padding, containerWidth

const PageLayout = React.forwardRef<HTMLDivElement, PageLayoutProps>(
  ({ className, children, ...props }, ref) => {
    const { theme } = useContext(ThemePickerContext)

    const themeClassName =
      theme === 'light' ? 'inf-ui-theme-light' : 'inf-ui-theme-dark'

    return (
      <div
        ref={ref}
        className={cn('inf-page-layout', themeClassName, className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

PageLayout.displayName = 'PageLayout'

export default Object.assign(PageLayout, {
  Header: PageLayoutHeader,
  Body: PageLayoutBody,
  Aside: PageLayoutAside,
  Content: PageLayoutContent,
  BottomBar: PageLayoutBottomBar,
  Footer: PageLayoutFooter
})
