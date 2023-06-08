// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  ReactElement,
  forwardRef,
  ComponentPropsWithoutRef
} from 'react'
import cn from 'classnames'
import './SelectButton.scss'
import { ReactComponent as ArrowDownIcon } from 'Icons/chevron-down.svg'

export interface SelectButtonProps extends ComponentPropsWithoutRef<'button'> {
  status?: 'error'
  disabled?: boolean
  selected?: boolean
  focused?: boolean
}

const SelectButton = forwardRef<HTMLButtonElement, SelectButtonProps>(
  (
    { status, selected, focused, disabled, className, children, ...props },
    ref
  ): ReactElement => {
    return (
      <button
        ref={ref}
        type={'button'}
        className={cn(
          'inf-select-button',
          {
            [`inf-select-button--status-${status as string}`]: status,
            'inf-select-button--focused': focused && !disabled,
            'inf-select-button--selected': selected,
            'inf-select-button--disabled': disabled
          },
          className
        )}
        disabled={disabled}
        {...props}
      >
        <span
          className={cn('inf-select-button__arrow', {
            'inf-select-button__arrow--selected': selected
          })}
        >
          <ArrowDownIcon width={'10px'} height={'5px'} />
        </span>
        {children}
      </button>
    )
  }
)

SelectButton.displayName = 'SelectButton'

export default SelectButton
