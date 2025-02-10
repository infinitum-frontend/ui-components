// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { Meta } from '@storybook/react'
import {
  SelectNew,
  // SelectOptions,
  SelectOption,
  SelectValue
} from './index'
import { useState } from 'react'
import { Space } from '../Space'
import { Text } from '../Text'
import {
  SelectBaseOptions
  // SelectBaseGroupedOptions
} from './utils/fixtures'

const meta: Meta<typeof SelectNew> = {
  title: 'Form/SelectNew',
  component: SelectNew
}

export default meta

export const Simple = {
  render: () => {
    const [value, setValue] = useState<SelectValue>()

    const handleChange = (selectedOption: SelectOption): void => {
      setValue(selectedOption.value)
    }

    const selectedOptionLabel = SelectBaseOptions.find(
      (option) => option.value === value
    )?.label

    return (
      <Space>
        <div style={{ maxWidth: '300px' }}>
          <SelectNew
            options={SelectBaseOptions}
            value={value}
            onChange={(newValue) => handleChange(newValue)}
          />
        </div>

        <Text>Selected Value: {value}</Text>
        <Text>Selected Option Label: {selectedOptionLabel}</Text>
      </Space>
    )
  }
}

export const Multiple = {
  render: () => {
    const [value, setValue] = useState<number[]>([])

    const handleChange = (selectedOptions: SelectOption[]): void => {
      console.log('handleChange', selectedOptions)
      // TODO: приведение типов number / string
      setValue(selectedOptions.map((option) => Number(option.value)))
    }

    // TODO: helper?
    const selectedOptionsLabels = SelectBaseOptions.filter((o) => {
      return value.includes(o.value)
    })
      .map((o) => o.label)
      .join(', ')

    return (
      <Space>
        <div style={{ maxWidth: '300px' }}>
          <SelectNew
            multiple
            options={SelectBaseOptions}
            value={value}
            onChange={(newValue) => handleChange(newValue)}
          />
        </div>

        <Text>Selected Values: {value.join(', ')}</Text>
        <Text>Selected Options Labels: {selectedOptionsLabels}</Text>
      </Space>
    )
  }
}

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
