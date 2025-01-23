import { Autocomplete } from 'Components/Autocomplete'
import { Checkbox } from 'Components/Checkbox'
import { Menu } from 'Components/Menu'
import { Text } from 'Components/Text'
import { Space } from 'Components/Space'
import { Tag } from 'Components/Tag'
import { SelectOption } from 'Components/Select'
import useUpdateEffect from 'Hooks/useUpdateEffect'
import { ReactComponent as CrossIcon } from 'Icons/cross.svg'
import { ComponentPropsWithoutRef, ReactElement, useState } from 'react'
import './Combobox.scss'
import { checkIsValueExists } from 'Utils/helpers'

export type CheckedItem = SelectOption['value']

export interface ComboboxProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
  options?: SelectOption[]
  checkedList: CheckedItem[]
  placeholder?: string
  displayValue?: string
  required?: boolean
  onChange?: (checkedList: CheckedItem[]) => void
  showTags?: boolean
  /** Максимальная высота контента, после которой начинается скролл */
  maxHeight?: number
  search?: string
  onSearch?: (search: string) => void
  disabled?: boolean
}

const filterFn = (options: SelectOption[], value: string): SelectOption[] =>
  options.filter((option) =>
    (option.label as string)?.toLowerCase().match(value.toLowerCase())
  )

const Combobox = ({
  options = [],
  placeholder,
  checkedList = [],
  onChange,
  showTags,
  displayValue,
  maxHeight,
  search,
  onSearch,
  disabled,
  ...props
}: ComboboxProps): ReactElement => {
  const [filteredOptions, setFilteredOptions] = useState(options)
  const [searchQuery, setSearchQuery] = useState('')

  useUpdateEffect(() => {
    setFilteredOptions(filterFn(options, searchQuery))
  }, [options, searchQuery])

  const checkedOptions = options.filter((option) => {
    return checkedList.some((item) => item === option.value)
  })

  const handleSearchChange = (value: string): void => {
    setSearchQuery(value)
    setFilteredOptions(filterFn(options, value))
  }

  const handleChange = (checked: Boolean, value: CheckedItem): void => {
    let newState: CheckedItem[]
    if (checked) {
      newState = [...checkedList, value]
    } else {
      newState = checkedList.filter((i) => i !== value)
    }

    onChange?.(newState)
  }

  const handleRemove = (value: CheckedItem): void => {
    const filteredList = checkedList.filter((item) => item !== value)
    onChange?.([...filteredList])
  }

  const checkedCount = checkedList.length
  return (
    <Autocomplete
      className="inf-combobox"
      {...props}
      disabled={disabled}
      selectedValue={checkedList[0]}
    >
      <Autocomplete.Button placeholder={placeholder}>
        {checkedCount > 0 ? (
          <Space direction="horizontal" align="center">
            <Text color="inverse" className="inf-combobox__counter">
              {checkedCount}
              <CrossIcon
                className="inf-combobox__counter-remove-icon"
                onClick={(e) => {
                  e.stopPropagation()
                  onChange?.([])
                }}
              />
            </Text>
            {displayValue && <Text variant="body-1">{displayValue}</Text>}
          </Space>
        ) : (
          ''
        )}
      </Autocomplete.Button>

      {showTags && Boolean(checkedOptions.length) && (
        <Space
          className="inf-combobox__tags"
          direction="horizontal"
          gap="medium"
          wrap
        >
          {checkedOptions.map((option, index) => (
            <Tag
              key={option.value}
              onRemove={() => handleRemove(option.value)}
              disabled={disabled}
            >
              {option.label}
            </Tag>
          ))}
        </Space>
      )}

      <Autocomplete.Dropdown>
        <Autocomplete.Input
          value={search ?? searchQuery}
          onChange={onSearch ?? handleSearchChange}
          allowClear={true}
          onClear={() => {
            setSearchQuery('')
            setFilteredOptions(filterFn(options, ''))
          }}
        />
        <Menu className="inf-combobox__menu" maxHeight={maxHeight}>
          {filteredOptions.map((option) => (
            <Menu.Item as="label" key={option.value}>
              <Menu.Item.Icon>
                <Checkbox
                  className="inf-combobox__checkbox"
                  checked={checkIsValueExists(
                    checkedList.find((i) => i === option.value)
                  )}
                  onChange={(checked) => handleChange(checked, option.value)}
                />
              </Menu.Item.Icon>
              <Menu.Item.Content>{option.label}</Menu.Item.Content>
            </Menu.Item>
          ))}
        </Menu>
      </Autocomplete.Dropdown>
    </Autocomplete>
  )
}

export default Combobox
