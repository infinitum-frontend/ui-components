// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  ReactElement,
  forwardRef,
  ComponentPropsWithoutRef
} from 'react'
import cn from 'classnames'
import './SelectButton.scss'
import ArrowDownIcon from 'Icons/chevron-down.svg?react'
import { TextFieldClasses } from '~/src/utils/textFieldClasses'
import { Loader } from '~/src/components/Loader'

export interface SelectButtonProps extends ComponentPropsWithoutRef<'button'> {
  status?: 'error'
  disabled?: boolean
  loading?: boolean
  selected?: boolean
  opened?: boolean
  focused?: boolean
  /** Нужно ли применять стили плейсхолдера */
  isPlaceholder?: boolean // TODO: придумать решение лучше
}

const SelectButton = forwardRef<HTMLButtonElement, SelectButtonProps>(
  (
    {
      status,
      selected,
      opened,
      focused,
      disabled,
      loading,
      className,
      children,
      isPlaceholder,
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
            'inf-select-button--loading': loading,
            'inf-select-button--placeholder': isPlaceholder
          },
          className
        )}
        disabled={disabled}
        {...props}
      >
        <span
          className={cn('inf-select-button__arrow', {
            'inf-select-button__arrow--active': selected,
            'inf-select-button__arrow--rotated': opened,
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
