import { useVirtualizer } from '@tanstack/react-virtual'
import cn from 'classnames'
import FormContext from 'Components/Form/context/form'
import FormGroupContext from 'Components/Form/context/group'
import useFormControlHandlers from 'Components/Form/hooks/useFormControlHandlers'
import {
  ReactElement,
  useContext,
  useEffect,
  useId,
  useRef,
  useState
} from 'react'
import { Loader } from '../Loader'
import { Menu } from '../Menu'
import { Popover } from '../Popover'
import SelectButton from './components/SelectButton'
import SelectDropdownHint from './components/SelectDropdownHint'
import SelectEmpty from './components/SelectEmpty'
import SelectFilterInput from './components/SelectFilterInput'
import SelectNativeElement from './components/SelectNativeElement'
import SelectOption from './components/SelectOption'
import useSelect from './hooks/useSelect'
import useSelectOptions from './hooks/useSelectOptions'
import './Select.scss'
import {
  SELECT_DROPDOWN_SELECTOR,
  SELECT_OPTION_HEIGHT
} from './utils/constants'
import {
  FlattenOption,
  SelectOption as SelectOptionType,
  SelectProps
} from './utils/types'

const Select = <Multiple extends boolean = false>({
  options = [],
  value,
  onChange,
  multiple,
  filterable,
  clearable,
  disabled: disabledProp,
  required = false,
  loading,
  loaderPlacement = 'inline',
  placeholder = 'Выберите значение',
  size,
  filterPlacement = 'dropdown',
  emptyMessage = 'Ничего не найдено',
  dropdownHint,
  onFilterChange,
  onClear,
  maxItemsCount = 12,
  popoverWidth,
  popoverPlacement = 'bottom-start',
  renderControl,
  className,
  maxHeight: maxHeightProp,
  virtualized,
  dropdownOpen: controlledDropdownOpen,
  onDropdownOpenChange: controlledOnDropdownOpenChange,
  'aria-required': ariaRequired,
  'aria-invalid': ariaInvalid,
  ...props
}: SelectProps<Multiple>): ReactElement => {
  const [filterValue, setFilterValue] = useState('')
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false)

  const isOpen = controlledDropdownOpen ?? uncontrolledOpen
  const setOpen = controlledOnDropdownOpenChange ?? setUncontrolledOpen

  const prefix = useId()

  const formGroupContext = useContext(FormGroupContext)
  const formContext = useContext(FormContext)
  const { onControlInvalid, resetControlValidity } = useFormControlHandlers()

  const { filteredFlattenOptions, flattenOptions, filteredOptions } =
    useSelectOptions({
      options,
      filterValue,
      filterable,
      // если передан проп onFilterChange, то фильтрация options происходит снаружи
      customFiltering: Boolean(onFilterChange)
    })

  const {
    handleSelect,
    handleClear: handleClearState,
    checkOptionSelection,
    hasSelectedValue,
    displayValue,
    selectedOptions
  } = useSelect({
    options: flattenOptions,
    value,
    onChange,
    multiple,
    onClear
  })

  // ============================= effects =============================
  useEffect(() => {
    if (!isOpen) {
      handleFilterChange('')
    }
  }, [isOpen])

  // ============================= handlers =============================

  const handleOptionSelect = (option: SelectOptionType): void => {
    handleSelect(option)
    resetControlValidity()

    if (!multiple) {
      setOpen(false)
    }
  }

  const handleFilterChange = (filterValue: string): void => {
    if (!filterable) {
      return
    }
    setFilterValue(filterValue)
    // поиск обрабатывается снаружи
    if (onFilterChange) {
      onFilterChange(filterValue)
    }
  }

  const handleClear = (): void => {
    if (onClear) {
      onClear()
    } else {
      handleClearState()
    }
  }

  // ============================= render =============================
  const isDisabled = disabledProp || formContext?.disabled
  const isRequired = formGroupContext?.required || required
  // высота элемента, паддинг и границы
  const maxHeight = maxHeightProp || maxItemsCount * 36 + 4 + 2
  const showInlineFilterInput =
    filterable && isOpen && filterPlacement === 'inline'
  const popoverFocus = showInlineFilterInput ? -1 : 0 // TODO: непонятно что тут происходит

  const showDropdownLoader = loading && loaderPlacement === 'dropdown'

  return (
    <Popover
      open={isOpen}
      onOpenChange={setOpen}
      offset={{
        mainAxis: 4
      }}
      initialFocus={popoverFocus}
      placement={popoverPlacement}
      // TODO: ломает закрытие по клику вне внутри Popover
      // onPressOutside={handlePopoverPressOutside}
    >
      <Popover.Trigger>
        <SelectButton
          tabIndex={-1}
          className={cn(className, 'inf-select')}
          filterable={filterable && filterPlacement === 'inline'}
          filterValue={filterValue}
          onFilterChange={handleFilterChange}
          displayValue={displayValue}
          selectedOptionsCount={multiple && selectedOptions.length}
          clearable={Boolean(clearable && hasSelectedValue && !multiple)}
          onClear={handleClear}
          disabled={Boolean(isDisabled)}
          required={isRequired}
          loading={Boolean(loading)}
          placeholder={placeholder}
          size={size}
          opened={isOpen}
          renderControl={renderControl}
          nativeSelectSlot={
            <SelectNativeElement
              options={filteredOptions}
              value={value}
              id={formGroupContext?.id}
              multiple={Boolean(multiple)}
              required={isRequired}
              disabled={Boolean(isDisabled || loading)}
              ariaRequired={
                formGroupContext?.required || required || ariaRequired
              }
              ariaInvalid={formGroupContext?.invalid || ariaInvalid}
              onInvalid={onControlInvalid}
            />
          }
          onClick={() => setOpen(!isOpen)}
          {...props}
        />
      </Popover.Trigger>

      <Popover.Content
        hasPadding={false}
        equalTriggerWidth={Boolean(!popoverWidth)}
        width={popoverWidth}
        data-selector={SELECT_DROPDOWN_SELECTOR}
      >
        {filterable && filterPlacement === 'dropdown' && (
          <SelectFilterInput
            value={filterValue}
            onChange={handleFilterChange}
            onClear={() => {
              handleFilterChange('')
            }}
          />
        )}

        {filteredFlattenOptions.length > 0 ? (
          virtualized ? (
            <VirtualizedOptions
              options={filteredFlattenOptions}
              isOpen={isOpen}
              multiple={Boolean(multiple)}
              checkOptionSelection={checkOptionSelection}
              handleOptionSelect={handleOptionSelect}
              maxHeight={maxHeight}
            />
          ) : (
            <Menu as="ul" className="inf-select__options" maxHeight={maxHeight}>
              {filteredFlattenOptions.map((option, index) => {
                return 'groupLabel' in option ? ( // TODO : использовать хелпер isGroupLabel
                  <Menu.Label key={String(option.groupLabel) + prefix}>
                    {option.groupLabel}
                  </Menu.Label>
                ) : (
                  <SelectOption
                    key={String(option.value) + prefix}
                    selected={checkOptionSelection(option)}
                    selectionIndicator={multiple ? 'checkbox' : 'tick'}
                    onSelect={() => {
                      handleOptionSelect(option)
                    }}
                  >
                    {option.label}
                  </SelectOption>
                )
              })}
            </Menu>
          )
        ) : showDropdownLoader ? (
          <Loader />
        ) : (
          <SelectEmpty>{emptyMessage}</SelectEmpty>
        )}
        {dropdownHint && <SelectDropdownHint hint={dropdownHint} />}
      </Popover.Content>
    </Popover>
  )
}
// TODO: отрефакторить чтобы избавиться от дублирования шаблона
const VirtualizedOptions = ({
  options,
  maxHeight,
  isOpen,
  multiple,
  checkOptionSelection,
  handleOptionSelect
}: {
  options: FlattenOption[]
  maxHeight: number
  isOpen: boolean
  multiple: boolean
  checkOptionSelection: (option: SelectOptionType) => boolean
  handleOptionSelect: (option: SelectOptionType) => void
}): ReactElement => {
  const listRef = useRef(null)

  const virtualizer = useVirtualizer({
    count: options.length,
    getScrollElement: () => listRef.current,
    estimateSize: () => SELECT_OPTION_HEIGHT,
    enabled: isOpen,
    overscan: 10
  })

  // TODO: нужно ли сбрасывать скролл до старта после закрытия всплывающего окна? Сейчас не сбрасывается
  const virtualizedListTotalHeight = virtualizer.getTotalSize()
  const virtualizedListItems = virtualizer.getVirtualItems()

  return (
    <Menu
      ref={listRef}
      as="div"
      className="inf-select__options"
      maxHeight={maxHeight}
    >
      <div
        style={{
          height: `${virtualizedListTotalHeight}px`,
          width: '100%',
          position: 'relative'
        }}
      >
        <ul
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            transform: `translateY(${virtualizedListItems[0]?.start ?? 0}px)`
          }}
        >
          {virtualizedListItems.map((virtualItem) => {
            const { index } = virtualItem
            const option = options[index]
            const key = virtualItem.key.toString()
            return 'groupLabel' in option ? ( // TODO : использовать хелпер isGroupLabel
              <Menu.Label
                key={key}
                data-index={index}
                ref={virtualizer.measureElement}
              >
                {option.groupLabel}
              </Menu.Label>
            ) : (
              <SelectOption
                key={key}
                data-index={index}
                ref={virtualizer.measureElement}
                selected={checkOptionSelection(option)}
                selectionIndicator={multiple ? 'checkbox' : 'tick'}
                onSelect={() => {
                  handleOptionSelect(option)
                }}
              >
                {option.label}
              </SelectOption>
            )
          })}
        </ul>
      </div>
    </Menu>
  )
}

export default Select

// TODO:
// debounce на filterValue
// нужен ли автофокус на поле фильтрации в dropdown?
