import cn from 'classnames'
import React, { ComponentPropsWithoutRef } from 'react'
import { ReactComponent as LogoFull } from './assets/logo-full.svg'
import { ReactComponent as LogoFullMono } from './assets/logo-full-mono.svg'
import { ReactComponent as LogoFullNoCaption } from './assets/logo-full-no-caption.svg'
import { ReactComponent as LogoFullInverse } from './assets/logo-full-inverse.svg'
import { ReactComponent as LogoShort } from './assets/logo-short.svg'
import './index.scss'

export interface LogoProps extends ComponentPropsWithoutRef<'div'> {
  variant?: 'default' | 'no-caption' | 'monochrome' | 'inverse' | 'short'
}

const Logo = React.forwardRef<HTMLDivElement, LogoProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    let template
    if (variant === 'short') {
      template = <LogoShort />
    } else if (variant === 'monochrome') {
      template = <LogoFullMono />
    } else if (variant === 'inverse') {
      template = <LogoFullInverse />
    } else if (variant === 'no-caption') {
      template = <LogoFullNoCaption />
    } else {
      template = <LogoFull />
    }

    return (
      <div ref={ref} className={cn('inf-logo', className)} {...props}>
        {template}
      </div>
    )
  }
)

Logo.displayName = 'Logo'

export default Logo
