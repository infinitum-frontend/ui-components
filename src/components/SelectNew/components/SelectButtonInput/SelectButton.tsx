import { forwardRef, ReactElement } from 'react'
import { Input, InputProps } from '~/src/components/Input'
import { ReactComponent as ArrowDownIcon } from 'Icons/chevron-down.svg'
import { Loader } from '~/src/components/Loader'
import { SelectOption } from '../../utils/types'
import SelectCounter from '../SelectCounter'
import './SelectButton.scss'
import { ClearButton } from '~/src/components/ClearButton'
import { Space } from '~/src/components/Space'

interface SelectButtonProps {
  selectedOptions?: SelectOption[]
  filterable?: boolean
  filterValue?: string
  onFilterChange?: (filterValue: string) => void
  clearable?: boolean
  onClear: () => void
  size?: InputProps['size']
  placeholder?: string
  loading?: boolean
  disabled?: boolean
  multiple?: boolean
}

const SelectButton = forwardRef<HTMLButtonElement, SelectButtonProps>(
  (
    {
      selectedOptions,
      filterValue,
      filterable,
      onFilterChange,
      clearable,
      loading,
      onClear,
      placeholder,
      size,
      disabled,
      multiple,
      ...props
    },
    ref
  ): ReactElement => {
    const selectedOptionsCount = selectedOptions ? selectedOptions.length : 0
    const hasSelectedOptions = selectedOptionsCount > 0
    const showCounter = multiple && hasSelectedOptions
    const hasFilterValue = filterable && filterValue

    const handleOptionsClear = (): void => {
      // TODO: обработать кейс когда filterable и clearable, и кнопка очистка одна на 2 действия - как разделить по UX?
      onClear()
    }

    const handleFilterClear = (): void => {
      onFilterChange?.('')
    }

    let inputValue = ''

    if (hasFilterValue) {
      inputValue = filterValue
    } else {
      if (hasSelectedOptions) {
        inputValue = selectedOptions?.map((o) => o.label).join(', ') || ''
      }
    }

    return (
      <button className="inf-new-select-button" ref={ref} {...props}>
        <Input
          disabled={disabled}
          readOnly={!filterable}
          size={size}
          placeholder={hasSelectedOptions ? '' : placeholder}
          value={inputValue}
          onClear={handleOptionsClear}
          onChange={onFilterChange}
          prefix={
            showCounter && (
              <SelectCounter
                count={selectedOptionsCount}
                onClear={handleOptionsClear}
              />
            )
          }
          postfix={
            <>
              {loading ? (
                <Loader size="compact" variant="unset" />
              ) : (
                <Space direction="horizontal" gap="xxsmall" align="center">
                  {hasFilterValue ? (
                    <ClearButton
                      onClick={(e) => {
                        e.stopPropagation()
                        handleFilterClear()
                      }}
                    />
                  ) : (
                    clearable && (
                      <ClearButton
                        onClick={(e) => {
                          e.stopPropagation()
                          handleOptionsClear()
                        }}
                      />
                    )
                  )}
                  <ArrowDownIcon />
                </Space>
              )}
            </>
          }
        />
      </button>
    )
  }
)

SelectButton.displayName = 'SelectButton'

export default SelectButton
