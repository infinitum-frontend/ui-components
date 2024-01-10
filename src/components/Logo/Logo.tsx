import cn from 'classnames'
import React, { ComponentPropsWithoutRef } from 'react'
import { ReactComponent as LogoFull } from './assets/logo-full.svg'
import { ReactComponent as LogoFullMono } from './assets/logo-full-mono.svg'
import { ReactComponent as LogoFullCompanyGroup } from './assets/logo-full-company-group.svg'
import { ReactComponent as LogoFullInverse } from './assets/logo-full-inverse.svg'
import { ReactComponent as LogoOnly } from './assets/logo-only.svg'
import './Logo.scss'

export interface LogoProps extends ComponentPropsWithoutRef<'div'> {
  variant?: 'default' | 'monochrome' | 'inverse' | 'company-group' | 'logo-only'
  prefix?: string
}

const logoVariantIconMap = {
  default: <LogoFull />,
  'logo-only': <LogoOnly />,
  monochrome: <LogoFullMono />,
  inverse: <LogoFullInverse />,
  'company-group': <LogoFullCompanyGroup />
}

/** Логотип */
const Logo = React.forwardRef<HTMLDivElement, LogoProps>(
  ({ className, variant = 'default', prefix, ...props }, ref) => {
    const template = logoVariantIconMap[variant]

    return (
      <div
        ref={ref}
        className={cn('inf-logo', className, {
          'inf-logo--inverse': variant === 'inverse'
        })}
        {...props}
      >
        {prefix && <span className="inf-logo__prefix">{prefix}</span>}
        {template}
      </div>
    )
  }
)

Logo.displayName = 'Logo'

export default Logo
