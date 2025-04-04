// eslint-disable-next-line @typescript-eslint/no-unused-vars
import cn from 'classnames'
import ArrowDownIcon from 'Icons/chevron-down.svg?react'
import { ComponentPropsWithoutRef, ReactElement, forwardRef } from 'react'
import { Loader } from '~/src/components/Loader'
import { TextFieldClasses } from '~/src/utils/textFieldClasses'
import './SelectButton.scss'

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
          'inf-select-old-button',
          TextFieldClasses.main,
          TextFieldClasses.borderRadius.regular,
          {
            [TextFieldClasses.status[status as 'error']]: status,
            [TextFieldClasses.focused]: focused && !disabled,
            [TextFieldClasses.filled]: selected,
            [TextFieldClasses.disabled]: disabled,
            'inf-select-old-button--loading': loading,
            'inf-select-old-button--placeholder': isPlaceholder
          },
          className
        )}
        disabled={disabled}
        {...props}
      >
        <span
          className={cn('inf-select-old-button__arrow', {
            'inf-select-old-button__arrow--active': selected,
            'inf-select-old-button__arrow--rotated': opened,
            'inf-select-old-button__arrow--disabled': disabled
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
