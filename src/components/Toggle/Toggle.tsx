import './index.scss'
import React from 'react'
import cn from 'classnames'

export interface ToggleProps {
  className?: string
  checked?: boolean
  role?: string
  onChange?: (checked: boolean) => void
  disabled?: boolean
}

const Toggle: React.FunctionComponent<ToggleProps> = ({
  className,
  checked = false,
  role = 'toggle',
  onChange = () => {},
  disabled = false
}) => {
  return (
    <label className={cn('inf-toggle', className)} role={role}>
      <div
        className={cn(
          'inf-toggle__bg',
          { 'inf-toggle__bg--checked': checked },
          checked ? 'inf-toggle__bg--on' : 'inf-toggle__bg--off'
        )}
      />
      <div
        className={cn('inf-toggle__switch-handle', {
          'inf-toggle__switch-handle--checked': checked
        })}
      />
      <input
        className="inf-toggle__switch"
        role="switch"
        aria-checked={checked}
        type="checkbox"
        defaultChecked={checked}
        onChange={() => onChange(!checked)}
        disabled={disabled}
      />
    </label>
  )
}

Toggle.displayName = 'Toggle'

export default Toggle
