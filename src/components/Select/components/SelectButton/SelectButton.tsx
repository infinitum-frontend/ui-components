// eslint-disable-next-line @typescript-eslint/no-unused-vars
import cn from 'classnames'
import {
  ComponentPropsWithoutRef,
  FocusEventHandler,
  ReactElement,
  ReactNode,
  forwardRef,
  useState
} from 'react'
import { ClearButton } from '~/src/components/ClearButton'
import { Loader } from '~/src/components/Loader'
import { TextFieldClasses } from '~/src/utils/textFieldClasses'
import { SelectProps } from '../../utils/types'
import SelectArrow from '../SelectArrow'
import SelectCounter from '../SelectCounter'
import './SelectButton.scss'

export interface SelectButtonProps
  extends Omit<ComponentPropsWithoutRef<'button'>, 'prefix'> {
  displayValue: string
  status?: 'error'
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
      status,
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
      // const target = e.relatedTarget
      // if (
      //   target?.getAttribute?.('data-selector') === SELECT_DROPDOWN_SELECTOR
      // ) {
      //   return
      // }
      setFocused(false)
    }

    const showFilterInput = filterable && opened
    const showClearButton = clearable

    // TODO: возможно стоит вынести в компонент Select и рендерить renderControl вместе SelectButton, а не прокидывать в проп
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
          'inf-select-button',
          className,
          TextFieldClasses.main,
          TextFieldClasses.borderRadius.regular,
          TextFieldClasses.size[size],
          {
            [TextFieldClasses.status[status as 'error']]: status,
            [TextFieldClasses.disabled]: disabled,
            [TextFieldClasses.focused]: isFocused && !disabled,
            [TextFieldClasses.filled]: selected,
            'inf-select-button--loading': loading
          }
        )}
        type="button"
        disabled={disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      >
        {(Boolean(selectedOptionsCount) || prefix) && (
          <div className="inf-select-button__before">
            {prefix}
            {/* TODO: сделать слотом? */}
            {Boolean(selectedOptionsCount) && (
              <SelectCounter
                size={size}
                count={selectedOptionsCount}
                onClear={onClear}
              />
            )}
          </div>
        )}

        {showFilterInput ? (
          <input
            className="inf-select-button__filter-input"
            value={filterValue}
            autoFocus
            onChange={(e) => onFilterChange(e.target.value)}
            onClick={(e) => {
              e.stopPropagation()
            }}
            autoComplete="off"
          />
        ) : (
          <div className="inf-select-button__content">
            {displayValue ? (
              <div
                className="inf-select-button__display-value"
                title={displayValue}
              >
                {displayValue}
              </div>
            ) : (
              Boolean(placeholder) && (
                <div
                  className="inf-select-button__placeholder"
                  title={placeholder}
                >
                  {placeholder}
                </div>
              )
            )}
          </div>
        )}

        <div className="inf-select-button__after">
          {loading ? (
            <Loader
              className="inf-select-button__loader"
              size="compact"
              variant="unset"
            />
          ) : (
            <>
              {showClearButton && (
                // Кнопка очистки выбранного значения
                <ClearButton
                  as="div"
                  className="inf-select-button__clear-button"
                  title="Очистить значение"
                  onClick={(e) => {
                    e.stopPropagation()
                    onClear()
                  }}
                />
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
