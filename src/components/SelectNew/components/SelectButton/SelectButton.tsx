// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  ReactElement,
  forwardRef,
  ComponentPropsWithoutRef,
  FocusEventHandler,
  useState,
  ReactNode
} from 'react'
import cn from 'classnames'
import './SelectButton.scss'
import { TextFieldClasses } from '~/src/utils/textFieldClasses'
import { Loader } from '~/src/components/Loader'
import { ClearButton } from '~/src/components/ClearButton'
import { SelectProps } from '../../utils/types'
import SelectCounter from '../SelectCounter'
import SelectArrow from '../SelectArrow'
import { SELECT_DROPDOWN_SELECTOR } from '../../utils/constants'

export interface SelectButtonProps
  extends Omit<ComponentPropsWithoutRef<'button'>, 'prefix'> {
  displayValue: string
  // status?: 'error'
  selected?: boolean
  filterable?: SelectProps['filterable']
  filterValue: string
  onFilterChange: (filterValue: string) => void
  clearable: SelectProps['clearable']
  onClear: () => void
  size?: SelectProps['size']
  prefix?: SelectProps['prefix']
  loading: boolean
  disabled: boolean
  required: boolean
  selectedOptionsCount?: number
  placeholder?: string
  opened: boolean
  nativeSelectSlot: ReactNode
  renderControl: SelectProps['renderControl']
}

// TODO: onBlur срабатывает неверно (на inf-popover-content)

const SelectButton = forwardRef<HTMLButtonElement, SelectButtonProps>(
  (
    {
      displayValue,
      // status,
      selected,
      disabled,
      required,
      loading,
      filterable,
      filterValue,
      onFilterChange,
      className,
      children,
      size = 'medium',
      placeholder,
      clearable,
      onClear,
      prefix,
      opened,
      selectedOptionsCount = 0,
      nativeSelectSlot,
      renderControl,
      ...props
    },
    ref
  ): ReactElement => {
    const [isFocused, setFocused] = useState(false)

    const handleFocus: FocusEventHandler = (e) => {
      // TODO:
      e.preventDefault()
      setFocused(true)
    }

    // блюр, который поднимается от внутреннего нативного селекта. Если было нажатие на элементы выпадающего списка, фокус не скидывается
    const handleBlur: FocusEventHandler = (e) => {
      // TODO:
      const target = e.relatedTarget
      if (
        target?.getAttribute?.('data-selector') === SELECT_DROPDOWN_SELECTOR
      ) {
        return
      }
      // console.log('handleBlur')
      setFocused(false)
    }

    if (renderControl) {
      return renderControl({
        ref,
        isOpen: opened,
        displayValue,
        disabled,
        required,
        onClick: props.onClick
      })
    }

    return (
      <button
        ref={ref}
        className={cn(
          'inf-select-new-button',
          className,
          TextFieldClasses.main,
          TextFieldClasses.borderRadius.regular,
          TextFieldClasses.size[size],
          {
            'inf-select-new-button--loading': loading,
            [TextFieldClasses.disabled]: disabled,
            [TextFieldClasses.focused]: isFocused && !disabled,
            [TextFieldClasses.filled]: selected
          }
        )}
        type="button"
        disabled={disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      >
        {(Boolean(selectedOptionsCount) || prefix) && (
          <div className="inf-select-new-button__before">
            {prefix}
            {Boolean(selectedOptionsCount) && (
              <SelectCounter
                size={size}
                count={selectedOptionsCount}
                onClear={onClear}
              />
            )}
          </div>
        )}

        {filterable && opened ? (
          <input
            className="inf-select-new-button__filter-input"
            value={filterValue}
            autoFocus
            onChange={(e) => onFilterChange(e.target.value)}
            onClick={(e) => {
              e.stopPropagation()
            }}
            autoComplete="off"
          />
        ) : (
          <div className="inf-select-new-button__content">
            {displayValue ? (
              <div className="inf-select-new-button__display-value">
                {displayValue}
              </div>
            ) : (
              Boolean(placeholder) && (
                <div className="inf-select-new-button__placeholder">
                  {placeholder}
                </div>
              )
            )}
          </div>
        )}

        <div className="inf-select-new-button__after">
          {loading ? (
            <Loader size="compact" />
          ) : (
            <>
              {filterable && opened && filterValue ? (
                <ClearButton
                  onClick={(e) => {
                    e.stopPropagation()
                    onFilterChange('')
                  }}
                />
              ) : (
                clearable && (
                  <ClearButton
                    onClick={(e) => {
                      e.stopPropagation()
                      onClear()
                    }}
                  />
                )
              )}
              <SelectArrow opened={opened} />
            </>
          )}
        </div>

        {nativeSelectSlot}
      </button>
    )
  }
)

SelectButton.displayName = 'SelectButton'

export default SelectButton
