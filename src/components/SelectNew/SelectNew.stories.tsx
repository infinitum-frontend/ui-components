// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import {
  SelectNew,
  // SelectOptions,
  SelectOption,
  SelectOptions,
  SelectValue
} from './index'
import { useState } from 'react'
import { Space } from '../Space'
import { Text } from '../Text'
import { Icon } from '../Icon'
import { Button } from '../Button'
import {
  SelectBaseOptions,
  SelectBaseGroupedOptions,
  SelectLongOptions
} from './utils/fixtures'
import { removeDuplicates } from 'Utils/helpers'
import { ReactComponent as SearchIcon } from 'Icons/search.svg'
import { ReactComponent as ArrowDownIcon } from 'Icons/chevron-down.svg'
import { ReactComponent as ArrowUpIcon } from 'Icons/chevron-up.svg'

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

export const LongPlaceholder = {
  render: SingleTemplate,
  args: {
    placeholder: 'Выберите значение или пожалеете'
  }
}

export const Scrollable = {
  render: SingleTemplate,
  args: {
    options: SelectLongOptions,
    maxItemsCount: 5
  }
}

export const Overflow = {
  render: () => {
    const [value, setValue] = useState<SelectValue>()

    return (
      <SelectNew
        style={{ maxWidth: '100px' }}
        options={SelectBaseOptions}
        value={value}
        onChange={(option: SelectOption) => setValue(option.value)}
        placeholder="Выберите значение"
      />
    )
  }
}

export const Prefix = {
  render: SingleTemplate,
  args: {
    prefix: (
      <Icon color="primary" size="medium">
        <SearchIcon />
      </Icon>
    )
  }
}

export const LongValue = {
  render: SingleTemplate,
  args: {
    disabled: true
  }
}

export const Empty = {
  render: SingleTemplate,
  args: {
    options: []
  }
}

export const PopoverWidth = {
  render: SingleTemplate,
  args: {
    style: {
      width: '150px'
    },
    popoverWidth: '250px'
  }
}

export const Small = {
  render: SingleTemplate,
  args: {
    size: 'small'
  }
}

export const Loading = {
  render: SingleTemplate,
  args: {
    loading: true
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

export const Clearable = {
  render: SingleTemplate,
  args: {
    clearable: true
  }
}

export const MultipleClearable = {
  render: MultipleTemplate,
  args: {
    clearable: true
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
  render: (args) => {
    const [selectedOption, setSelectedOption] = useState<SelectOption>()
    const [filterValue, setFilterValue] = useState('')
    const [options, setOptions] = useState<SelectOptions>([])
    const [isLoading, setLoading] = useState(true)

    const handleChange = (selectedOption: SelectOption): void => {
      setSelectedOption(selectedOption)
    }

    React.useEffect(() => {
      const fetch = async (): Promise<void> => {
        setLoading(true)
        const response = await fetchAsyncData(filterValue)
        setOptions(response)
        setLoading(false)
      }

      void fetch()
    }, [filterValue])

    console.log('options', options)

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
          onFilterChange={(filterValue) => {
            console.log('onFilterChange', filterValue)
            setFilterValue(filterValue)
          }}
        />

        <Text>{selectedOption?.label || ''}</Text>
      </Space>
    )
  }
}
export const AsyncOptionsLoading = {
  render: (args) => {
    const [value, setValue] = useState<SelectValue>('')

    React.useEffect(() => {}, [])

    const handleChange = (selectedOption: SelectOption): void => {
      setValue(selectedOption ? selectedOption.value : '')
    }

    const handleLoadOptions = async (
      filterValue?: string
    ): Promise<SelectOptions> => {
      return await fetchAsyncData(filterValue)
    }

    return (
      <Space>
        <SelectNew
          style={{ maxWidth: '300px' }}
          value={value}
          onChange={handleChange}
          loadOptions={handleLoadOptions}
        />

        <Text>{value}</Text>
      </Space>
    )
  }
}

export const AsyncOptionsFilterable = {
  render: (args) => {
    const [value, setValue] = useState<SelectValue>('')

    const handleChange = (selectedOption: SelectOption): void => {
      setValue(selectedOption ? selectedOption.value : '')
    }

    const handleLoadOptions = async (
      filterValue?: string
    ): Promise<SelectOptions> => {
      return await fetchAsyncData(filterValue)
    }

    return (
      <Space>
        <SelectNew
          style={{ maxWidth: '300px' }}
          loadOptions={handleLoadOptions}
          filterable
          value={value}
          onChange={handleChange}
        />

        <Text>{value}</Text>
      </Space>
    )
  }
}

export const CustomControl = {
  render: (args) => {
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

// export const AsyncOptionsFilterableDebounced = {
//   render: (args) => {
//     const [value, setValue] = useState<SelectValue>('')

//     const handleChange = (selectedOption: SelectOption): void => {
//       setValue(selectedOption ? selectedOption.value : '')
//     }

//     const handleLoadOptions = async (
//       filterValue?: string
//     ): Promise<SelectOptions> => {
//       return await new Promise<SelectOptions>((resolve) => {
//         setTimeout(() => {
//           resolve(SelectBaseOptions)
//         }, 2000)
//       })
//     }

//     return (
//       <Space>
//         <SelectNew
//           style={{ maxWidth: '300px' }}
//           loadOptions={handleLoadOptions}
//           filterable
//           value={value}
//           onChange={handleChange}
//         />

//         <Text>{value}</Text>
//       </Space>
//     )
//   }
// }

export const AsyncOptionsFilterableWithSelectedOptions = {
  render: (args) => {
    const [selectedOptions, setSelectedOptions] = useState<SelectOption[]>([])

    const handleChange = (selectedOptions: SelectOption[]): void => {
      setSelectedOptions(selectedOptions)
    }

    const handleLoadOptions = async (
      filterValue?: string
    ): Promise<SelectOptions> => {
      const options = await fetchAsyncData(filterValue)
      return removeDuplicates([...selectedOptions, ...options])
    }

    const selectedValues = selectedOptions.map((option) => option.value)
    const selectedOptionsLabels = selectedOptions
      .map((option) => option.label)
      .join(', ')

    return (
      <Space>
        <SelectNew
          style={{ maxWidth: '300px' }}
          loadOptions={handleLoadOptions}
          multiple
          filterable
          value={selectedValues}
          onChange={handleChange}
        />

        <Text>{selectedOptionsLabels}</Text>
      </Space>
    )
  }
}

export const Typescript = {
  render: () => (
    <>
      {/* Одна строка */}
      <SelectNew
        options={SelectBaseOptions}
        value="one"
        onChange={(value) => {}}
      />
      {/* Одно число */}
      <SelectNew
        options={SelectBaseOptions}
        value={1}
        onChange={(value) => {}}
      />
      {/* Много строк */}
      <SelectNew
        multiple
        options={SelectBaseOptions}
        value={['one', 'two', 'three']}
        onChange={(value) => {}}
      />
      {/* Много чисел */}
      <SelectNew
        multiple
        options={SelectBaseOptions}
        value={[1, 2, 3]}
        onChange={(value) => {}}
      />
    </>
  )
}

// export const Simple = {
//   render: () => {
//     const [value, setValue] = useState<SelectValue>()

//     const handleChange = (selectedOption: SelectOption): void => {
//       setValue(selectedOption.value)
//     }

//     const selectedOptionLabel = SelectBaseOptions.find(
//       (option) => option.value === value
//     )?.label

//     return (
//       <Grid templateColumns="400px 400px">
//         <Space>
//           <Text>Без группировки</Text>
//           <SelectNew
//             options={SelectBaseOptions}
//             value={value}
//             onChange={(newValue) => handleChange(newValue)}
//           />

//           <Text>Selected Value: {value}</Text>
//           <Text>Selected Option Label: {selectedOptionLabel}</Text>
//         </Space>
//         <Space>
//           <Text>С группировкой</Text>
//           <SelectNew
//             options={SelectBaseGroupedOptions}
//             value={value}
//             onChange={(newValue) => handleChange(newValue)}
//           />

//           <Text>Selected Value: {value}</Text>
//           <Text>Selected Option Label: {selectedOptionLabel}</Text>
//         </Space>
//       </Grid>
//     )
//   }
// }

// export const Multiple = {
//   render: () => {
//     const [value, setValue] = useState<string[]>([])
//     console.log('value', value)
//     const handleChange = (selectedOptions: SelectOption[]): void => {
//       console.log('handleChange', selectedOptions)
//       // TODO: избиваться от приведение типов number / string (generic на value?)
//       setValue(selectedOptions.map((option) => String(option.value)))
//     }

//     // TODO: helper?
//     const selectedOptionsLabels = SelectBaseOptions.filter((o) => {
//       return value.includes(o.value)
//     })
//       .map((o) => o.label)
//       .join(', ')

//     return (
//       <Space>
//         <div style={{ maxWidth: '300px' }}>
//           <SelectNew
//             multiple
//             options={SelectBaseGroupedOptions}
//             value={value}
//             onChange={(newValue) => handleChange(newValue)}
//           />
//         </div>

//         <Text>Selected Values: {value.join(', ')}</Text>
//         <Text>Selected Options Labels: {selectedOptionsLabels}</Text>
//       </Space>
//     )
//   }
// }

// export const Filterable = {
//   render: () => {
//     const [value, setValue] = useState<SelectValue>()

//     const handleChange = (selectedOption: SelectOption): void => {
//       setValue(selectedOption.value)
//     }

//     const selectedOptionLabel = SelectBaseOptions.find(
//       (option) => option.value === value
//     )?.label

//     return (
//       <Space>
//         <div style={{ maxWidth: '300px' }}>
//           <SelectNew
//             filterable
//             options={SelectBaseGroupedOptions}
//             value={value}
//             onChange={(newValue) => handleChange(newValue)}
//           />
//         </div>

//         <Text>Selected Value: {value}</Text>
//         <Text>Selected Option Label: {selectedOptionLabel}</Text>
//       </Space>
//     )
//   }
// }

// export const Playground = {
//   render: Template
// }

// export const Base = {
//   render: BaseTemplate
// }

// export const Clearable = {
//   render: BaseTemplate,
//   args: {
//     filterable: true
//   }
// }

// export const Filterable = {
//   render: BaseTemplate,
//   args: {
//     clearable: true
//   }
// }

// export const Base = {
//   render: (args) => {
//     const [value, setValue] = useState<number | string | undefined>(undefined)

//     const handleChange = (item: SelectOption): void => {
//       setValue(item.value)
//     }

//     return (
//       <Space style={{ maxWidth: '300px' }}>
//         <Select {...args} value={value} onChange={handleChange} />
//         <Text>Selected Value: {value}</Text>
//       </Space>
//     )
//   }
// }

// export const Filterable = {
//   render: (args) => {
//     const [value, setValue] = useState<SelectValue>('')

//     const handleChange = (selectedOption: SelectOption): void => {
//       setValue(selectedOption ? selectedOption.value : '')
//     }

//     return (
//       <Space style={{ maxWidth: '300px' }}>
//         <SelectNew
//           options={SelectBaseOptions}
//           value={value}
//           onChange={handleChange}
//           filterable
//         />

//         <Text>{value}</Text>
//       </Space>
//     )
//   }
// }

// export const FilterableAndClearable = {
//   render: (args) => {
//     const [value, setValue] = useState<SelectValue>('')

//     const handleChange = (selectedOption: SelectOption): void => {
//       setValue(selectedOption ? selectedOption.value : '')
//     }

//     return (
//       <Space style={{ maxWidth: '300px' }}>
//         <SelectNew
//           options={SelectBaseOptions}
//           value={value}
//           onChange={handleChange}
//           filterable
//         />

//         <Text>{value}</Text>
//       </Space>
//     )
//   }
// }

// export const Multiple = {
//   render: (args) => {
//     const [values, setValues] = useState<string[]>([])

//     const handleChange = (selectedOptions: SelectOption[]): void => {
//       setValues(selectedOptions.map((item) => item.value))
//     }

//     return (
//       <Space style={{ maxWidth: '300px' }}>
//         <SelectNew
//           options={SelectBaseOptions}
//           multiple
//           onChange={handleChange}
//           value={values}
//         />
//         <Text>{values.join(', ')}</Text>
//       </Space>
//     )
//   }
// }

// export const GroupedSingle = {
//   render: (args) => {
//     const [value, setValue] = useState<SelectValue>('')

//     const handleChange = (selectedOption: SelectOption): void => {
//       setValue(selectedOption ? selectedOption.value : '')
//     }

//     return (
//       <Space style={{ maxWidth: '300px' }}>
//         <SelectNew
//           options={SelectBaseGroupedOptions}
//           onChange={handleChange}
//           value={value}
//         />
//         <Text>{value}</Text>
//       </Space>
//     )
//   }
// }

// export const GroupedMultiple = {
//   render: (args) => {
//     const [values, setValues] = useState<string[]>([])

//     const handleChange = (selectedOptions: SelectOption[]): void => {
//       setValues(selectedOptions.map((item) => String(item.value)))
//     }

//     return (
//       <Space style={{ maxWidth: '300px' }}>
//         <SelectNew
//           options={SelectBaseGroupedOptions}
//           multiple
//           onChange={handleChange}
//           value={values}
//         />
//         <Text>{values.join(', ')}</Text>
//       </Space>
//     )
//   }
// }

// export const AsyncOptions = {
//   render: (args) => {
//     const [value, setValue] = useState<SelectValue>('')

//     const handleChange = (selectedOption: SelectOption): void => {
//       setValue(selectedOption ? selectedOption.value : '')
//     }

//     const handleLoadOptions = async (filterValue: string) => {
//       console.log('handleLoadOptions', filterValue)
//       return await new Promise<SelectOptions>((resolve) => {
//         setTimeout(() => {
//           resolve(SelectBaseOptions)
//         }, 2000)
//       })
//     }

//     return (
//       <Space style={{ maxWidth: '300px' }}>
//         <SelectNew
//           value={value}
//           onChange={handleChange}
//           loadOptions={handleLoadOptions}
//         />

//         <Text>{value}</Text>
//       </Space>
//     )
//   }
// }

// export const AsyncOptionsFilterable = {
//   render: (args) => {
//     const [value, setValue] = useState<SelectValue>('')

//     const handleChange = (selectedOption: SelectOption): void => {
//       setValue(selectedOption ? selectedOption.value : '')
//     }

//     const handleLoadOptions = async (filterValue: string) => {
//       console.log('handleLoadOptions', filterValue)
//       return await new Promise<SelectOptions>((resolve) => {
//         setTimeout(() => {
//           const filtered = SelectBaseOptions.filter((option) =>
//             option.label
//               .toLocaleLowerCase()
//               .includes(filterValue.toLocaleLowerCase())
//           )
//           resolve(filtered)
//         }, 2000)
//       })
//     }

//     return (
//       <Space style={{ maxWidth: '300px' }}>
//         <SelectNew
//           value={value}
//           onChange={handleChange}
//           loadOptions={handleLoadOptions}
//           filterable
//         />

//         <Text>{value}</Text>
//       </Space>
//     )
//   }
// }
