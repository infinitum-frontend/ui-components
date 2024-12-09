// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  ReactElement,
  forwardRef,
  ComponentPropsWithoutRef,
  ReactNode,
  MouseEventHandler
} from 'react'
import cn from 'classnames'
import './SelectButton.scss'
import { ReactComponent as ArrowDownIcon } from 'Icons/chevron-down.svg'
import { TextFieldClasses } from '~/src/utils/textFieldClasses'
import { Loader } from '~/src/components/Loader'
import { ReactComponent as ClearIcon } from 'Icons/cancel-circle.svg'

export interface SelectButtonProps extends ComponentPropsWithoutRef<'button'> {
  status?: 'error'
  disabled?: boolean
  loading?: boolean
  selected?: boolean
  focused?: boolean
  allowClear?: boolean | { icon: ReactNode }
  onClear?: () => void
}

const SelectButton = forwardRef<HTMLButtonElement, SelectButtonProps>(
  (
    {
      status,
      selected,
      focused,
      disabled,
      loading,
      allowClear,
      onClear,
      className,
      children,
      ...props
    },
    ref
  ): ReactElement => {
    const handleClear: MouseEventHandler<HTMLSpanElement> = (e) => {
      e.stopPropagation()
      onClear?.()
    }

    const getClearIcon: () => ReactNode = () => {
      if (!allowClear) {
        return null
      }

      const iconNode =
        typeof allowClear === 'object' && allowClear.icon ? (
          allowClear.icon
        ) : (
          <ClearIcon width={20} height={20} />
        )

      return (
        <span
          onClick={(e) => handleClear(e)}
          className="inf-select-button__clear"
        >
          {iconNode}
        </span>
      )
    }

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
        {!loading && allowClear && getClearIcon()}
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
