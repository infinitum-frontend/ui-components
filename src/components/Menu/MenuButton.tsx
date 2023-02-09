import React, { ComponentPropsWithoutRef } from 'react'
import { Button } from 'Components/Button'

import cn from 'classnames'

export interface MenuButtonProps extends ComponentPropsWithoutRef<'button'> {
  className?: string
}

const MenuButton = React.forwardRef<HTMLButtonElement, MenuButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Button ref={ref} className={cn('inf-menu-button', className)} {...props}>
        {children}
      </Button>
    )
  }
)

MenuButton.displayName = 'MenuButton'

export default MenuButton
