import { ReactElement, useEffect, useState } from 'react'
import { SelectProps } from './utils/types'
import useSelect from './hooks/useSelect'
import useSelectOptions from './hooks/useSelectOptions'
import SelectButton from './components/SelectButton'
import { Popover } from '../Popover'
import SelectFilterInput from './components/SelectFilterInput'
import SelectEmpty from './components/SelectEmpty'
import SelectOption from './components/SelectOption'
import { Menu } from '../Menu'
import { SELECT_DROPDOWN_SELECTOR } from './utils/constants'
import './SelectNew.scss'

const SelectNew = <Multiple extends boolean = false>({
  options: optionsProp,
  value,
  onChange,
  multiple,
  filterable,
  clearable,
  disabled,
  loading,
  placeholder,
  size,
  loadOptions,
  filterPlacement = 'dropdown',
  emptyMessage = 'Ничего не найдено',
  onClear,
  maxItemsCount = 12,
  ...props
}: SelectProps<Multiple>): ReactElement => {
  const [filterValue, setFilterValue] = useState('')
  const [options, setOptions] = useState(optionsProp ? [...optionsProp] : [])
  const [isLoadingOptions, setLoadingOptions] = useState(false)

  useEffect(() => {
    if (loadOptions) {
      const fetchOptions = async (): Promise<void> => {
        setLoadingOptions(true)
        const loadedOptions = await loadOptions(filterValue)
        setOptions(loadedOptions)
        setLoadingOptions(false)
      }

      void fetchOptions()
    }
  }, [filterValue])

  const { filteredFlattenOptions, flattenOptions } = useSelectOptions({
    options,
    filterValue,
    filterable
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

  const isLoading = loading || isLoadingOptions
  // высота элемента, паддинг и границы
  const maxHeight = maxItemsCount * 32 + 4 + 2

  return (
    <Popover
      open={isOpen}
      onOpenChange={setOpen}
      offset={{
        mainAxis: 4
      }}
      // TODO: ломает закрытие по клику вне внутри Popover
      // onPressOutside={handlePopoverPressOutside}
    >
      <Popover.Trigger>
        <SelectButton
          displayValue={displayValue}
          selectedOptionsCount={multiple && selectedOptions.length}
          clearable={Boolean(clearable && hasSelectedValue)}
          onClear={handleClear}
          disabled={Boolean(disabled)}
          loading={isLoading}
          placeholder={placeholder}
          size={size}
          onClick={() => {
            setOpen(!isOpen) // TODO: нужен ли здесь setState(v => !v)
          }}
          opened={isOpen}
          {...props}
        />
      </Popover.Trigger>

      <Popover.Content
        hasPadding={false}
        equalTriggerWidth
        data-selector={SELECT_DROPDOWN_SELECTOR}
      >
        {filterable && filterPlacement === 'dropdown' && (
          <SelectFilterInput
            value={filterValue}
            onChange={setFilterValue}
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
                <Menu.Label key={index}>{option.groupLabel}</Menu.Label>
              ) : (
                <SelectOption
                  key={index}
                  selected={checkOptionSelection(option)}
                  selectionIndicator={multiple ? 'checkbox' : 'tick'}
                  onSelect={() => {
                    handleSelect(option)
                  }}
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
