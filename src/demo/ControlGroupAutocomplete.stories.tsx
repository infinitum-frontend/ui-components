// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { Autocomplete } from '../components/Autocomplete'
import { ReactNode, useState } from 'react'
import { Menu } from '../components/Menu'
import { Checkbox } from '../components/Checkbox'

const meta: Meta<typeof Autocomplete> = {
  title: 'Demo/ControlGroupAutocomplete',
  component: Autocomplete
}

export default meta

const mockItems = [
  {
    text: 'Акции',
    value: 'stock',
    subitems: [
      {
        text: 'Акции ИФ акций',
        value: 'stock'
      },
      {
        text: 'Акции ИФ венчурного',
        value: 'venture'
      },
      {
        text: 'Акции ИФ денежного рынка',
        value: 'money'
      },
      {
        text: 'Акции ИФ ипотечного',
        value: 'mortgage'
      }
    ]
  },
  {
    text: 'Облигации',
    value: 'bonds',
    subitems: [
      {
        text: 'Облигации внешних облигационных займов РФ',
        value: 'foreignLoans'
      },
      {
        text: 'Облигации государственных компаний',
        value: 'innerCompanies'
      },
      {
        text: 'Облигации государственных корпораций',
        value: 'innerCorporation'
      },
      {
        text: 'Облигации международных организаций',
        value: 'foreignBonds'
      }
    ]
  }
]
const getCollapsedContent = (
  option: (typeof mockItems)[0],
  handleChange: (checked: boolean, optionValue: string, value: string) => void,
  checked: Record<string, boolean>
): ReactNode => {
  return (
    Boolean(option.subitems) && (
      <Menu nested={true}>
        {option.subitems?.map((subOption) => (
          <Menu.Item key={subOption.text}>
            <Menu.Item.Content>{subOption.text}</Menu.Item.Content>
            <Menu.Item.Button>
              <Checkbox
                checked={checked[subOption.value]}
                onChange={(checked) =>
                  handleChange(checked, option.value, subOption.value)
                }
              />
            </Menu.Item.Button>
          </Menu.Item>
        ))}
      </Menu>
    )
  )
}
const Template: StoryFn<typeof Autocomplete> = (args) => {
  const [options, setOptions] = useState(mockItems)
  const [query, setQuery] = useState('')
  const [checked, setChecked] = useState({
    stock: {
      stock: false,
      venture: false,
      money: false,
      mortgage: false
    },
    bonds: {
      foreignLoans: false,
      innerCompanies: false,
      innerCorporation: false,
      foreignBonds: false
    }
  })

  const handleInput = (value: string): void => {
    setQuery(value)
    setOptions(() => {
      return mockItems.reduce((accumulator, currentValue) => {
        const filteredSubitems = currentValue.subitems.filter((subitem) =>
          subitem.text.toLowerCase().match(value.toLowerCase())
        )
        if (filteredSubitems.length) {
          // @ts-expect-error
          accumulator.push({ ...currentValue, subitems: filteredSubitems })
        }

        return accumulator
      }, [])
    })
  }

  const handleChange = (
    checked: boolean,
    optionValue: string,
    value: string
  ): void => {
    setChecked((prev) => {
      const newState = { ...prev }
      // @ts-expect-error
      newState[optionValue][value] = checked

      return newState
    })
  }

  const getRootCheckboxState = (value: 'bonds' | 'stock'): boolean => {
    const values = Object.values(checked[value])
    return values.length === values.filter(Boolean).length
  }

  const checkIndeterminate = (value: 'bonds' | 'stock'): boolean => {
    const values = Object.values(checked[value])
    return (
      values.filter(Boolean).length > 0 &&
      values.length > values.filter(Boolean).length
    )
  }

  const handleRootCheckboxChange = (
    checked: boolean,
    value: 'bonds' | 'stock'
  ): void => {
    setChecked((prev) => {
      const newState = { ...prev }
      Object.keys(newState[value]).forEach((key) => {
        // @ts-expect-error
        newState[value][key] = checked
      })
      return newState
    })
  }

  return (
    <Autocomplete>
      <Autocomplete.Button
        placeholder={'Добавить вид актива в контрольную группу'}
      />
      <Autocomplete.Dropdown>
        <Autocomplete.Input value={query} onInput={handleInput} />
        <Menu>
          {options.map((option) => (
            <Menu.Item
              collapsible={true}
              collapsedContent={getCollapsedContent(
                option,
                handleChange,
                checked[option.value as 'stock' | 'bonds']
              )}
              key={option.text}
            >
              <Menu.Item.Content>{option.text}</Menu.Item.Content>
              <Menu.Item.Button>
                <Checkbox
                  checked={getRootCheckboxState(
                    option.value as 'stock' | 'bonds'
                  )}
                  indeterminate={checkIndeterminate(
                    option.value as 'stock' | 'bonds'
                  )}
                  onChange={(checked) =>
                    handleRootCheckboxChange(
                      checked,
                      option.value as 'stock' | 'bonds'
                    )
                  }
                />
              </Menu.Item.Button>
            </Menu.Item>
          ))}
        </Menu>
      </Autocomplete.Dropdown>
    </Autocomplete>
  )
}

export const ControlGroupAutocomplete = Template.bind({})
