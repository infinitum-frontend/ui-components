import cn from 'classnames'
import FormContext from 'Components/Form/context/form'
import FormGroupContext from 'Components/Form/context/group'
import useFormControlHandlers from 'Components/Form/hooks/useFormControlHandlers'
import {
  MouseEventHandler,
  ReactElement,
  useContext,
  useEffect,
  useId,
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
import { SELECT_DROPDOWN_SELECTOR } from './utils/constants'
import { SelectOption as SelectOptionType, SelectProps } from './utils/types'

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
  placeholder,
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
  'aria-required': ariaRequired,
  'aria-invalid': ariaInvalid,
  ...props
}: SelectProps<Multiple>): ReactElement => {
  const [filterValue, setFilterValue] = useState('')

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
    isOpen,
    setOpen,
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
  const handleOpenToggle: MouseEventHandler = (e): void => {
    setOpen(!isOpen)
  }

  const handleOptionSelect = (option: SelectOptionType): void => {
    handleSelect(option)
    resetControlValidity()
  }

  const handleFilterChange = (filterValue: string): void => {
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
  const maxHeight = maxItemsCount * 36 + 4 + 2
  const popoverFocus =
    filterable && isOpen && filterPlacement === 'inline' ? -1 : 0

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
          onClick={(e) => handleOpenToggle(e)}
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
            allowClear={true}
            onClear={() => {
              handleFilterChange('')
            }}
          />
        )}
        {filteredFlattenOptions.length > 0 ? (
          <Menu
            as="div"
            className="inf-select__options"
            data-testid="list"
            maxHeight={maxHeight}
          >
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

export default Select
