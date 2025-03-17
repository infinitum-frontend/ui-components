import {
  MouseEventHandler,
  ReactElement,
  useContext,
  useEffect,
  useId,
  useState
} from 'react'
import { SelectProps, SelectOption as SelectOptionType } from './utils/types'
import useSelect from './hooks/useSelect'
import useSelectOptions from './hooks/useSelectOptions'
import SelectButton from './components/SelectButton'
import { Popover } from '../Popover'
import SelectFilterInput from './components/SelectFilterInput'
import SelectEmpty from './components/SelectEmpty'
import SelectOption from './components/SelectOption'
import { Menu } from '../Menu'
import { SELECT_DROPDOWN_SELECTOR } from './utils/constants'
import FormContext from 'Components/Form/context/form'
import useFormControlHandlers from 'Components/Form/hooks/useFormControlHandlers'
import SelectNativeElement from './components/SelectNativeElement'
import FormGroupContext from 'Components/Form/context/group'
import './SelectNew.scss'

const SelectNew = <Multiple extends boolean = false>({
  options = [],
  value,
  onChange,
  multiple,
  filterable,
  clearable,
  disabled: disabledProp,
  required = false,
  loading,
  placeholder,
  size,
  // loadOptions,
  filterPlacement = 'dropdown',
  emptyMessage = 'Ничего не найдено',
  onFilterChange,
  onClear,
  maxItemsCount = 12,
  popoverWidth,
  renderControl,
  className,
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
      customFiltering: Boolean(onFilterChange)
    })

  const {
    handleSelect,
    handleClear,
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

  // TODO: управление с клавиатуры
  // const { handleKeyDown, activeItemIndex, setActiveItemIndex } =
  //   useKeyboardNavigation({
  //     options: filteredFlattenOptions,
  //     onSelect: handleSelect,
  //     isOpen,
  //     setOpen
  //   })

  // ============================= effects =============================
  useEffect(() => {
    if (!isOpen) {
      setFilterValue('')
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

  // ============================= render =============================
  const isDisabled = disabledProp || formContext?.disabled
  const isRequired = formGroupContext?.required || required
  const isLoading = Boolean(loading)
  // || isLoadingOptions
  // высота элемента, паддинг и границы
  const maxHeight = maxItemsCount * 32 + 4 + 2
  const popoverFocus =
    filterable && isOpen && filterPlacement === 'inline' ? -1 : 0

  return (
    <Popover
      open={isOpen}
      onOpenChange={setOpen}
      offset={{
        mainAxis: 4
      }}
      initialFocus={popoverFocus}
      placement="bottom-start"
      // TODO: ломает закрытие по клику вне внутри Popover
      // onPressOutside={handlePopoverPressOutside}
    >
      <Popover.Trigger>
        <SelectButton
          className={className}
          filterable={filterable && filterPlacement === 'inline'}
          filterValue={filterValue}
          onFilterChange={handleFilterChange}
          displayValue={displayValue}
          selectedOptionsCount={multiple && selectedOptions.length}
          clearable={Boolean(clearable && hasSelectedValue)}
          onClear={handleClear}
          disabled={Boolean(isDisabled)}
          required={isRequired}
          loading={isLoading}
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
              onInvalid={onControlInvalid}
            />
          }
          onClick={(e) => handleOpenToggle(e)}
          {...props}
        />
      </Popover.Trigger>

      <Popover.Content
        hasPadding={false}
        equalTriggerWidth={Boolean(!popoverWidth) && Boolean(!renderControl)}
        width={popoverWidth}
        data-selector={SELECT_DROPDOWN_SELECTOR}
        // onKeyDown={handleKeyDown}
      >
        {filterable && filterPlacement === 'dropdown' && (
          <SelectFilterInput
            value={filterValue}
            onChange={handleFilterChange}
            allowClear={true}
            onClear={() => {
              setFilterValue('')
            }}
          />
        )}
        {filteredFlattenOptions.length > 0 ? (
          <Menu className="inf-select-new__options" maxHeight={maxHeight}>
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
                  // TODO: управление с клавиатуры
                  // active={index === activeItemIndex}
                  // onMouseOver={() => setActiveItemIndex(index)}
                >
                  {option.label}
                </SelectOption>
              )
            })}
          </Menu>
        ) : (
          <SelectEmpty>{emptyMessage}</SelectEmpty>
        )}
      </Popover.Content>
    </Popover>
  )
}

export default SelectNew

// TODO:
// Generic для SelectValue: string / number / еще что-то?
// null если SelectValue отсутствует?
// обработка пустых значений в компоненте потребителе при очистке значения по кнопке. onChange вернет null / пустой массив?
// Лейблы групп портфелей сделать disabled? как в gravity ui
// если filterable и не multiselect, то как работать с инпутом, если в нем будет лейбл выбранного значения?
// изначальная загрузка асинхронная с бэка, но фильтрация на стороне клиента. Просто loading = true и передать options после загрузки?
// синк выбранных значений и опций, если вдруг выбранных опций уже нет в options (см как решели в Hse Design system)
// debounce при асинхронной фильтрации на стороне потребителя?
// cacheOptions: boolean
// управление клавиатурой
// виртуализация
// нативная валидация и нативный селект
// onChange добавить второй аргумент возврата для value
// defaultSelectItem
// value как number - нужны ли сторис и тесты
// forwardRef
// Если у нас select clearable и не передали onClear, то срабатываем onChange - с каким аругментом? Там же option. возвращать null?
// кейс когда есть выбранные опции, они сохраняются на бэке, но при первой загрузке селекта мы запрашиваем только часть опций с бэка, среди которых нет выбранных опций. Надо мержить на стороне потребителя или как то иначе?
// Controlled filterValue: Должна быть возможность обработки колбэка очистки инпута фильтрации снаружи, редкий кейс когда может понадобиться хранить стейт filterValue снаружи, например, если фильтр установлен по умолчанию. прокидывание функции для кастомной логики фильтрации? (option: any, inputValue: string) => boolean
// Асинхронная подгрузка + сортировка выбранных опций наверх
// Плашка "Показано n элементов"
// Кейс когда мы грузим изначальный список options, но при этом просто вешаем loading=true пока он не загрузился, без использования loadOptions
// onInputChange для обработки асихнронной загрузки как в baseWeb?

// const handlePopoverPressOutside = (e: MouseEvent): any => {
// TODO:
// if (formGroupContext) {
//   return (
//     (e.target as HTMLLabelElement)?.htmlFor !== formGroupContext?.id
//   )
// } else {
//   return true
// }
// }

// TODO: data-selector={SELECT_DROPDOWN_SELECTOR}

// TODO:
// {...getFloatingProps({
//   onClick(e) {
//     e.stopPropagation()
//   }
// })}

// TODO:
// {...getReferenceProps({
//   onKeyDown: handleKeyDown,
//   onClick(e) {
//     e.stopPropagation()
//     handleClick(e)
//   }
// })}

// TODO: Popover width / height
// style={{
//   position: 'absolute',
//   maxHeight: `${maxHeight}px`,
//   top: y ?? 0,
//   left: x ?? 0
// }}
