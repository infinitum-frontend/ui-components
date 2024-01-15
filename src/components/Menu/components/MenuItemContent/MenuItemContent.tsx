// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ReactElement, ReactNode } from 'react'
import './MenuItemContent.scss'
import cn from 'classnames'

export interface MenuItemContentProps {
  /** Занимает всю доступную ширину
   * @default true
   */
  stretched?: boolean
  children?: ReactNode
  textWithHighlighting?: string
}

const MenuItemContent = ({
  stretched = true,
  children,
  textWithHighlighting
}: MenuItemContentProps): ReactElement => {
  return textWithHighlighting ? (
    <div
      className={cn('inf-menu-item-content', {
        'inf-menu-item-content--unstretched': !stretched
      })}
      dangerouslySetInnerHTML={{
        __html: `<span>
            ${textWithHighlighting}
          </span>`
      }}
    />
  ) : (
    <div
      className={cn('inf-menu-item-content', {
        'inf-menu-item-content--unstretched': !stretched
      })}
    >
      {children}
    </div>
  )
}

export default MenuItemContent
