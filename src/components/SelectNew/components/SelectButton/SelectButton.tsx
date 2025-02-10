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
import { Space } from '~/src/components/Space'
import { ClearButton } from '~/src/components/ClearButton'
import { SelectProps } from '../../utils/types'
import SelectCounter from '../SelectCounter'

export interface SelectButtonProps extends ComponentPropsWithoutRef<'button'> {
  status?: 'error'
  focused?: boolean
  selected?: boolean
  /** Нужно ли применять стили плейсхолдера */
  isPlaceholder?: boolean // TODO: придумать решение лучше
  clearable: boolean
  onClear: () => void
  size?: SelectProps['size']
  placeholder?: string
  loading: boolean
  disabled: boolean
  multiple: boolean
  selectedOptionsCount: number
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
      isPlaceholder,
      clearable,
      onClear,
      selectedOptionsCount = 0,
      multiple,
      ...props
    },
    ref
  ): ReactElement => {
    // TODO: вынести ли все это и сделать компонент тупым чисто на пропах?
    const hasSelectedOptions = selectedOptionsCount > 0
    const showCounter = multiple && hasSelectedOptions

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
        {showCounter && (
          <SelectCounter count={selectedOptionsCount} onClear={onClear} />
        )}

        {children}

        <span
          className={cn('inf-select-button__arrow', {
            'inf-select-button__arrow--active': selected,
            'inf-select-button__arrow--disabled': disabled
          })}
        >
          {loading ? (
            <Loader size="compact" variant="unset" />
          ) : (
            <Space direction="horizontal" gap="xxsmall" align="center">
              {clearable && (
                <ClearButton
                  onClick={(e) => {
                    e.stopPropagation()
                    onClear()
                  }}
                />
              )}
              <ArrowDownIcon />
            </Space>
          )}
        </span>
      </button>
    )
  }
)

SelectButton.displayName = 'SelectButton'

export default SelectButton
