// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Meta, StoryFn, StoryObj } from '@storybook/react'
import ArrowDownIcon from 'Icons/chevron-down.svg?react'
import ArrowUpIcon from 'Icons/chevron-up.svg?react'
import StarIcon from 'Icons/star.svg?react'
import * as React from 'react'
import { useState } from 'react'
import { debounce } from '~/src/utils/helpers'
import { Button } from '../Button'
import { Form } from '../Form'
import { Icon } from '../Icon'
import { Space } from '../Space'
import { Text } from '../Text'
import { Select, SelectOption, SelectOptions, SelectValue } from './index'
import {
  SelectBaseGroupedOptions,
  SelectBaseOptions,
  SelectLongOptions
} from './utils/fixtures'

const meta: Meta<typeof Select> = {
  title: 'Form/Select',
  component: Select,
  args: {
    options: SelectBaseOptions
  }
}

export default meta

const SingleTemplate: StoryFn<typeof Select> = (args) => {
  const [value, setValue] = useState<SelectValue>()

  const handleChange = (selectedOption?: SelectOption): void => {
    setValue(selectedOption?.value)
  }

  const selectedOptionLabel = SelectBaseOptions.find(
    (option) => option.value === value
  )?.label

  return (
    <Space>
      <Select
        style={{ maxWidth: '300px' }}
        {...args}
        multiple={false}
        value={value}
        onChange={(newValue) => handleChange(newValue)}
      />

      <Text>Выбранные value: {value}</Text>
      <Text>Выбранные label: {selectedOptionLabel}</Text>
    </Space>
  )
}

const MultipleTemplate: StoryFn<typeof Select> = (args) => {
  const [value, setValue] = useState<SelectValue[]>([])

  const handleChange = (selectedOptions: SelectOption[]): void => {
    setValue(selectedOptions.map((option) => option.value))
  }

  // TODO: helper?
  const selectedOptionsLabels = SelectBaseOptions.filter((o) => {
    return value.includes(String(o.value))
  })
    .map((o) => o.label)
    .join(', ')

  return (
    <Space>
      <Select
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

export const StatusError = {
  render: SingleTemplate,
  args: {
    status: 'error'
  }
}

export const Overflow = {
  render: () => {
    const [value, setValue] = useState<SelectValue>()

    return (
      <Select
        style={{ maxWidth: '100px' }}
        popoverWidth="200px"
        options={SelectBaseOptions}
        value={value}
        onChange={(option?: SelectOption) => setValue(option?.value)}
      />
    )
  }
}

export const Scrollable = {
  render: SingleTemplate,
  args: {
    options: SelectLongOptions,
    maxHeight: 200
  }
}

export const Virtualized = {
  render: SingleTemplate,
  args: {
    options: Array.from({ length: 1000 }, (_, i) => ({
      value: `value-${i}`,
      label: `Options-${i}`
    })),
    maxHeight: 200,
    virtualized: true,
    filterable: true,
    filterPlacement: 'inline'
  }
}

export const PopoverPlacement: StoryObj<typeof Select> = {
  render: SingleTemplate,
  args: {
    popoverPlacement: 'top'
  },
  decorators: [
    (Story) => {
      return (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          {Story()}
        </div>
      )
    }
  ]
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
    const [multipleValue, setMultipleValue] = useState<SelectValue[]>([])

    const handleSingleChange = (selectedOption?: SelectOption): void => {
      setSingleValue(selectedOption?.value)
    }

    const handleMultipleChange = (selectedOptions: SelectOption[]): void => {
      setMultipleValue(selectedOptions.map((option) => option.value))
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
          <Select
            filterable
            value={singleValue}
            onChange={handleSingleChange}
            options={SelectBaseOptions}
          />
        </Form.Group>
        <Form.Group required>
          <Form.Label>Множественный выбор</Form.Label>
          <Select
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
    maxHeight: 200,
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

    const handleChange = (selectedOption?: SelectOption): void => {
      setValue(selectedOption?.value)
    }

    const selectedOptionLabel = SelectBaseOptions.find(
      (option) => option.value === value
    )?.label

    return (
      <Space>
        <Select
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

export const FilterableInlineMultiple = {
  render: MultipleTemplate,
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

export const ControlledAsyncOptions = {
  render: () => {
    const [selectedOption, setSelectedOption] = useState<SelectOption>()
    const [options, setOptions] = useState<SelectOptions>([])
    const [isLoading, setLoading] = useState(true)

    const handleChange = (selectedOption?: SelectOption): void => {
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
        <Select
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
// export const YoutrackIssueSelect = {
//   render: () => {
//     const [isLoading, setLoading] = useState(false)
//     // TODO: как будет работать типизация если с бэка будут прилетать группы опций
//     const [selectedOptions, setSelectedOptions] = useState<SelectOption[]>([])
//     const [options, setOptions] = useState<SelectOptions>([])

//     const fetchOptions = async (filterValue: string): Promise<void> => {
//       setLoading(true)

//       const responseOptions: SelectOption[] = await fetchAsyncData(filterValue)
//       const newOptions = removeDuplicates([
//         ...selectedOptions,
//         ...responseOptions
//       ]) as SelectOption[]

//       setOptions(newOptions)
//       setLoading(false)
//     }

//     const handleChange = (options: SelectOption[]): void => {
//       console.log('handleChange', options)
//       setSelectedOptions(options)
//     }

//     const handleFilterChange = debounce((filterValue: string): void => {
//       console.log('handleFilterChange', filterValue)
//       void fetchOptions(filterValue)
//     }, 300)

//     const selectedValues = selectedOptions.map((option) => option.value)

//     return (
//       <Form>
//         <Form.Group required>
//           <Form.Label>Label</Form.Label>
//           <Select
//             loading={isLoading}
//             options={options}
//             value={selectedValues}
//             onChange={handleChange}
//             onFilterChange={handleFilterChange}
//             multiple
//             filterable
//             filterPlacement="inline"
//             clearable
//             placeholder="Введите идентификатор задачи"
//             popoverPlacement="top"
//             maxItemsCount={10}
//             prefix={
//               <Tooltip content="Введите идентификатор связанной задачи в формате RISK - ##### и нажмите кнопку Добавить. Вы можете добавить несколько связанных задач">
//                 <Icon size="medium" color="primary">
//                   <IconInfoCircle />
//                 </Icon>
//               </Tooltip>
//             }
//           />
//         </Form.Group>
//         <Button type="submit">Отправить</Button>
//       </Form>
//     )
//   }
// }

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
//         <Select
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

    const handleChange = (selectedOption?: SelectOption): void => {
      setValue(selectedOption ? selectedOption.value : '')
    }

    return (
      <Space>
        <Select
          options={SelectBaseOptions}
          value={value}
          onChange={handleChange}
          popoverWidth="300px"
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

export const ControlledOpen = {
  render: () => {
    const [value, setValue] = useState<SelectValue>('')
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const handleChange = (selectedOption?: SelectOption): void => {
      setValue(selectedOption ? selectedOption.value : '')
    }

    return (
      <Space>
        <Space direction="horizontal">
          <Button onClick={() => setDropdownOpen(true)}>Открыть</Button>
          <Button onClick={() => setDropdownOpen(false)}>Закрыть</Button>
        </Space>

        <Text>isDropdownOpen: {dropdownOpen ? 'true' : 'false'}</Text>

        <Select
          style={{ maxWidth: '300px' }}
          dropdownOpen={dropdownOpen}
          onDropdownOpenChange={setDropdownOpen}
          options={SelectBaseOptions}
          value={value}
          onChange={handleChange}
        />

        <Text>{value}</Text>
      </Space>
    )
  }
}
