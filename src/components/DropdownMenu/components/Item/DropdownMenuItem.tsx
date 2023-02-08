import React from 'react'
import cn from 'classnames'
import './DropdownMenuItem.scss'

export interface DropdownMenuItemProps {
  className?: string
  label: string
  disabled?: boolean
}

const DropdownMenuItem = React.forwardRef<
  HTMLButtonElement,
  DropdownMenuItemProps & React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, label, disabled, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn('inf-dropdown-menu-item', className)}
      role="menuitem"
      disabled={disabled}
      {...props}
    >
      {label}
    </button>
  )
})

DropdownMenuItem.displayName = 'DropdownMenu.Item'

export default DropdownMenuItem
