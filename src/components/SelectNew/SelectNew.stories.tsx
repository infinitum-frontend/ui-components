// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Meta, StoryFn } from '@storybook/react'
import * as React from 'react'
import { useState } from 'react'
import { Button } from '../Button'
import { Icon } from '../Icon'
import { Space } from '../Space'
import { Text } from '../Text'
import {
  SelectNew,
  SelectNewOption as SelectOption,
  SelectNewOptions as SelectOptions,
  SelectNewValue as SelectValue
} from './index'
import {
  SelectBaseGroupedOptions,
  SelectBaseOptions,
  SelectLongOptions
} from './utils/fixtures'
// import { removeDuplicates } from 'Utils/helpers'
import ArrowDownIcon from 'Icons/chevron-down.svg?react'
import ArrowUpIcon from 'Icons/chevron-up.svg?react'
import StarIcon from 'Icons/star.svg?react'
import { Form } from '../Form'

const meta: Meta<typeof SelectNew> = {
  title: 'Form/SelectNew',
  component: SelectNew,
  args: {
    options: SelectBaseOptions,
    placeholder: 'Выберите значение'
  }
}

export default meta

const SingleTemplate: StoryFn<typeof SelectNew> = (args) => {
  const [value, setValue] = useState<SelectValue>()

  const handleChange = (selectedOption: SelectOption): void => {
    setValue(selectedOption?.value)
  }

  const selectedOptionLabel = SelectBaseOptions.find(
    (option) => option.value === value
  )?.label

  return (
    <Space>
      <SelectNew
        style={{ maxWidth: '300px' }}
        {...args}
        value={value}
        onChange={(newValue) => handleChange(newValue)}
      />

      <Text>Выбранные value: {value}</Text>
      <Text>Выбранные label: {selectedOptionLabel}</Text>
    </Space>
  )
}

const MultipleTemplate: StoryFn<typeof SelectNew> = (args) => {
  const [value, setValue] = useState<string[]>([])

  const handleChange = (selectedOptions: SelectOption[]): void => {
    // TODO: избиваться от приведение типов number / string (generic на value?)
    setValue(selectedOptions.map((option) => String(option.value)))
  }

  // TODO: helper?
  const selectedOptionsLabels = SelectBaseOptions.filter((o) => {
    return value.includes(o.value)
  })
    .map((o) => o.label)
    .join(', ')

  return (
    <Space>
      <SelectNew
        {...args}
        style={{ maxWidth: '300px' }}
        multiple
        value={value}
        onChange={(newValue) => handleChange(newValue)}
      />

      <Text>Выбранные value: {value.join(', ')}</Text>
      <Text>Выбранные label: {selectedOptionsLabels}</Text>
    </Space>
  )
}

export const Single = {
  render: SingleTemplate
}

export const Disabled = {
  render: SingleTemplate,
  args: {
    disabled: true
  }
}

export const Overflow = {
  render: () => {
    const [value, setValue] = useState<SelectValue>()

    return (
      <SelectNew
        style={{ maxWidth: '100px' }}
        popoverWidth="200px"
        options={SelectBaseOptions}
        value={value}
        onChange={(option: SelectOption) => setValue(option.value)}
        placeholder="Выберите значение"
      />
    )
  }
}

export const Scrollable = {
  render: SingleTemplate,
  args: {
    options: SelectLongOptions,
    maxItemsCount: 5
  }
}

export const Prefix = {
  render: SingleTemplate,
  args: {
    prefix: (
      <Icon color="primary" size="medium">
        <StarIcon />
      </Icon>
    )
  }
}

export const Small = {
  render: SingleTemplate,
  args: {
    size: 'small'
  }
}

export const EmptyOptions = {
  render: SingleTemplate,
  args: {
    options: []
  }
}

export const Loading = {
  render: SingleTemplate,
  args: {
    loading: true
  }
}

export const FormValidation = {
  render: () => {
    const [singleValue, setSingleValue] = useState<SelectValue>()
    const [multipleValue, setMultipleValue] = useState<string[]>([])

    const handleSingleChange = (selectedOption: SelectOption): void => {
      setSingleValue(selectedOption?.value)
    }

    const handleMultipleChange = (selectedOptions: SelectOption[]): void => {
      setMultipleValue(selectedOptions.map((option) => String(option.value)))
    }

    const handleSubmit = (): void => {
      alert(
        `Одиночный: ${
          singleValue as string
        } / Множественный: ${multipleValue.join(', ')}`
      )
    }

    return (
      <Form onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
        <Form.Group required>
          <Form.Label>Одиночный выбор</Form.Label>
          <SelectNew
            value={singleValue}
            onChange={handleSingleChange}
            options={SelectBaseOptions}
          />
        </Form.Group>
        <Form.Group required>
          <Form.Label>Множественный выбор</Form.Label>
          <SelectNew
            multiple
            value={multipleValue}
            onChange={handleMultipleChange}
            options={SelectBaseOptions}
          />
        </Form.Group>
        <Button type="submit">Отправить</Button>
      </Form>
    )
  }
}

export const WithDropdownHint = {
  render: SingleTemplate,
  args: {
    options: SelectLongOptions,
    maxItemsCount: 5,
    dropdownHint: 'Текст подсказки'
  }
}

export const Clearable = {
  render: SingleTemplate,
  args: {
    clearable: true
  }
}

export const OnClearHandler = {
  render: () => {
    const [value, setValue] = useState<SelectValue>()

    const handleChange = (selectedOption: SelectOption): void => {
      setValue(selectedOption?.value)
    }

    const selectedOptionLabel = SelectBaseOptions.find(
      (option) => option.value === value
    )?.label

    return (
      <Space>
        <SelectNew
          style={{ maxWidth: '300px' }}
          options={SelectBaseOptions}
          clearable
          onClear={() => {
            alert('handleClear')
            setValue('')
          }}
          value={value}
          onChange={(newValue) => handleChange(newValue)}
        />

        <Text>Выбранные value: {value}</Text>
        <Text>Выбранные label: {selectedOptionLabel}</Text>
      </Space>
    )
  }
}

export const SingleGrouped = {
  render: SingleTemplate,
  args: {
    options: SelectBaseGroupedOptions
  }
}

export const Multiple = {
  render: MultipleTemplate
}

export const MultipleGrouped = {
  render: MultipleTemplate,
  args: {
    options: SelectBaseGroupedOptions
  }
}

export const Filterable = {
  render: SingleTemplate,
  args: {
    filterable: true
  }
}

export const FilterableInline = {
  render: SingleTemplate,
  args: {
    filterable: true,
    filterPlacement: 'inline'
  }
}

export const FilterableInlineClearable = {
  render: SingleTemplate,
  args: {
    filterable: true,
    filterPlacement: 'inline',
    clearable: true
  }
}

export const FilterableGrouped = {
  render: SingleTemplate,
  args: {
    options: SelectBaseGroupedOptions,
    filterable: true
  }
}

export const MultipleFilterableGrouped = {
  render: MultipleTemplate,

  args: {
    options: SelectBaseGroupedOptions,
    filterable: true
  }
}

const fetchAsyncData = async (filterValue?: string): Promise<any> => {
  const response = await fetch(
    filterValue
      ? `https://dummyjson.com/users/search?q=${filterValue}`
      : 'https://dummyjson.com/users?'
  )
  const json = await response.json()
  const users = json.users
  return users.map((user) => {
    return {
      value: String(user.id),
      label: `${user.firstName as string} ${user.lastName as string}`
    }
  })
}

const debounce = (callback: any, wait: any): any => {
  let timeoutId: any = null
  return (...args: any) => {
    window.clearTimeout(timeoutId)
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args)
    }, wait)
  }
}

export const ControlledAsyncOptions = {
  render: () => {
    const [selectedOption, setSelectedOption] = useState<SelectOption>()
    const [options, setOptions] = useState<SelectOptions>([])
    const [isLoading, setLoading] = useState(true)

    const handleChange = (selectedOption: SelectOption): void => {
      setSelectedOption(selectedOption)
    }

    const fetchOptions = async (filterValue: string): Promise<void> => {
      setLoading(true)

      const responseOptions: SelectOption[] = await fetchAsyncData(filterValue)
      const optionsWithoutSelected = responseOptions.filter((option) => {
        return option.value !== selectedOption?.value
      })
      if (selectedOption) {
        optionsWithoutSelected.unshift(selectedOption)
      }

      setOptions(optionsWithoutSelected)
      setLoading(false)
    }

    const handleFilterChange = debounce((filterValue: string): void => {
      void fetchOptions(filterValue)
    }, 300)

    return (
      <Space>
        <SelectNew
          style={{ maxWidth: '300px' }}
          options={options}
          loading={isLoading}
          value={selectedOption?.value}
          placeholder="Выберите значение"
          onChange={handleChange}
          filterable
          onFilterChange={handleFilterChange}
        />

        <Text>{selectedOption?.label || ''}</Text>
      </Space>
    )
  }
}
// TODO:
// export const ControlledAsyncOptionsMultiple = {
//   render: () => {
//     const [selectedOptions, setSelectedOptions] = useState<SelectOption[]>([])
//     // const [filterValue, setFilterValue] = useState('')
//     const [options, setOptions] = useState<SelectOptions>([])
//     const [isLoading, setLoading] = useState(true)

//     const handleChange = (newOptions: SelectOption[]): void => {
//       setSelectedOptions(newOptions)
//     }

//     const handleFilterChange = (filterVaue: string): void => {
//       setOptions()
//     }

//     // React.useEffect(() => {
//     //   const fetch = async (): Promise<void> => {
//     //     setLoading(true)

//     //     const responseOptions: SelectOption[] = await fetchAsyncData(
//     //       filterValue
//     //     )
//     //     const optionsWithoutSelected = responseOptions.filter((option) => {
//     //       return !selectedOptions.find((o) => o.value === option.value)
//     //     })

//     //     if (selectedOptions.length) {
//     //       optionsWithoutSelected.unshift(...selectedOptions)
//     //     }

//     //     setOptions(optionsWithoutSelected)
//     //     setLoading(false)
//     //   }

//     //   void fetch()
//     // }, [filterValue])

//     const selectedValues = selectedOptions.map((option) => option.value) || []

//     return (
//       <Space>
//         <SelectNew
//           className="qwerqwer"
//           style={{ maxWidth: '300px' }}
//           multiple
//           options={options}
//           loading={isLoading}
//           value={selectedValues}
//           placeholder="Выберите значения"
//           onChange={handleChange}
//           filterable
//           onFilterChange={handleFilterChange}
//         />
//       </Space>
//     )
//   }
// }

export const CustomControl = {
  render: () => {
    const [value, setValue] = useState<SelectValue>('')

    const handleChange = (selectedOption: SelectOption): void => {
      setValue(selectedOption ? selectedOption.value : '')
    }

    return (
      <Space>
        <SelectNew
          options={SelectBaseOptions}
          value={value}
          onChange={handleChange}
          popoverWidth="300"
          renderControl={({
            isOpen,
            displayValue,
            onClick,
            ref
          }): React.ReactElement => {
            return (
              <Button
                ref={ref}
                variant="secondary"
                size="small"
                after={isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
                onClick={onClick}
              >
                {displayValue || 'Не выбрано'}
              </Button>
            )
          }}
        />

        <Text>{value}</Text>
      </Space>
    )
  }
}

// export const Typescript = {
//   render: () => (
//     <>
//       {/* Одна строка */}
//       <SelectNew
//         options={SelectBaseOptions}
//         value="one"
//         onChange={(value) => {}}
//       />
//       {/* Одно число */}
//       <SelectNew
//         options={SelectBaseOptions}
//         value={1}
//         onChange={(value) => {}}
//       />
//       {/* Много строк */}
//       <SelectNew
//         multiple
//         options={SelectBaseOptions}
//         value={['one', 'two', 'three']}
//         onChange={(value) => {}}
//       />
//       {/* Много чисел */}
//       <SelectNew
//         multiple
//         options={SelectBaseOptions}
//         value={[1, 2, 3]}
//         onChange={(value) => {}}
//       />
//     </>
//   )
// }
