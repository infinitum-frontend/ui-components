// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  ReactElement,
  forwardRef,
  ComponentPropsWithoutRef
} from 'react'
import cn from 'classnames'
import './SelectButton.scss'
import { ReactComponent as ArrowDownIcon } from 'Icons/chevron-down.svg'
import { TextFieldClasses } from '~/src/utils/textFieldClasses'
import { Loader } from '~/src/components/Loader'

export interface SelectButtonProps extends ComponentPropsWithoutRef<'button'> {
  status?: 'error'
  disabled?: boolean
  loading?: boolean
  selected?: boolean
  focused?: boolean
}

const SelectButton = forwardRef<HTMLButtonElement, SelectButtonProps>(
  (
    {
      status,
      selected,
      focused,
      disabled,
      loading,
      className,
      children,
      ...props
    },
    ref
  ): ReactElement => {
    return (
      <button
        ref={ref}
        type={'button'}
        className={cn(
          'inf-select-button',
          TextFieldClasses.main,
          TextFieldClasses.borderRadius.regular,
          {
            [TextFieldClasses.status[status as 'error']]: status,
            [TextFieldClasses.focused]: focused && !disabled,
            [TextFieldClasses.filled]: selected,
            [TextFieldClasses.disabled]: disabled,
            'inf-select-button--loading': loading
          },
          className
        )}
        disabled={disabled}
        {...props}
      >
        <span
          className={cn('inf-select-button__arrow', {
            'inf-select-button__arrow--active': selected,
            'inf-select-button__arrow--disabled': disabled
          })}
        >
          {loading ? (
            <Loader size="compact" variant="unset" />
          ) : (
            <ArrowDownIcon />
          )}
        </span>
        {children}
      </button>
    )
  }
)

SelectButton.displayName = 'SelectButton'

export default SelectButton
