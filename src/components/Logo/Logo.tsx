import cn from 'classnames'
import React, { ComponentPropsWithoutRef } from 'react'
import { ReactComponent as LogoFull } from './assets/logo-full.svg'
import { ReactComponent as LogoFullMono } from './assets/logo-full-mono.svg'
import { ReactComponent as LogoFullCompanyGroup } from './assets/logo-full-company-group.svg'
import { ReactComponent as LogoFullInverse } from './assets/logo-full-inverse.svg'
import { ReactComponent as LogoOnly } from './assets/logo-only.svg'
import nextDefaultLogo from './assets/next-logo-default.png'
import './Logo.scss'

export interface LogoProps extends ComponentPropsWithoutRef<'div'> {
  prefix?: string
  specdep: 'INFINITUM' | 'NEXT'
  variant: 'default' | 'monochrome' | 'inverse' | 'company-group' | 'logo-only'
}

// TODO: нужно потом переписать, при расширении вариантов лого для specdep=NEXT
const infinitumLogoVariantIconMap: Record<LogoProps['variant'], any> = {
  default: <LogoFull />,
  'logo-only': <LogoOnly />,
  monochrome: <LogoFullMono />,
  inverse: <LogoFullInverse />,
  'company-group': <LogoFullCompanyGroup />
}

/** Логотип */
const Logo = React.forwardRef<HTMLDivElement, LogoProps>(
  (
    { variant = 'default', specdep = 'INFINITUM', className, prefix, ...props },
    ref
  ) => {
    let template
    switch (specdep) {
      case 'INFINITUM':
        template = infinitumLogoVariantIconMap[variant]
        break
      case 'NEXT':
        template = <img src={nextDefaultLogo} alt="" />
        break
      default:
        template = null
    }

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
