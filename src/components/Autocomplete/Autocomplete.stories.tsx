import { StoryObj, StoryFn, Meta } from '@storybook/react'
import { Autocomplete } from './index'
import { useState } from 'react'
import { IAutocompleteOption } from './typings'
import { AutocompleteBaseOptions } from './fixture'

const meta: Meta<typeof Autocomplete> = {
  title: 'Form/Autocomplete',
  component: Autocomplete,
  subcomponents: {
    'Autocomplete.Button': Autocomplete.Button,
    'Autocomplete.Input': Autocomplete.Input,
    'Autocomplete.Dropdown': Autocomplete.Dropdown,
    'Autocomplete.Options': Autocomplete.Options,
    'Autocomplete.Option': Autocomplete.Option
  }
}

export default meta

const Template: StoryFn<typeof Autocomplete> = (args) => {
  const [selectedItem, setSelectedItem] = useState<string | number>('')

  return (
    <Autocomplete
      {...args}
      onChange={(value) => setSelectedItem(value)}
      options={AutocompleteBaseOptions}
      selectedValue={selectedItem}
    />
  )
}

export const Playground = {
  render: Template
}

export const ControlledVariant: StoryObj<typeof Autocomplete> = {
  render: (args) => {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState('')
    const [filteredItems, setFilteredItems] = useState(AutocompleteBaseOptions)
    const [selectedItem, setSelectedItem] =
      useState<IAutocompleteOption['value']>('')

    const handleClick = (value: IAutocompleteOption['value']): void => {
      setSelectedItem(value)
      setOpen(false)
    }

    const handleInput = (value: string): void => {
      setQuery(value)
      setFilteredItems(
        AutocompleteBaseOptions.filter((item) => {
          return item.label.toLowerCase().match(value.toLowerCase())
        })
      )
    }

    const handleInputSubmit = (): void => {
      setSelectedItem(filteredItems[0].value)
      setQuery('')
      setOpen(false)
    }

    return (
      <Autocomplete opened={open} onOpenChange={(value) => setOpen(value)}>
        <Autocomplete.Button placeholder={'Выберите услугу'}>
          {
            AutocompleteBaseOptions.find(
              (option) => option.value === selectedItem
            )?.label
          }
        </Autocomplete.Button>
        <Autocomplete.Dropdown>
          <Autocomplete.Input
            onSubmit={handleInputSubmit}
            value={query}
            onInput={handleInput}
            allowClear={true}
          />
          <Autocomplete.Options>
            {filteredItems.map((option) => (
              <Autocomplete.Option
                onClick={handleClick}
                key={option.value}
                value={option.value}
              >
                {option.label}
              </Autocomplete.Option>
            ))}
          </Autocomplete.Options>
        </Autocomplete.Dropdown>
      </Autocomplete>
    )
  }
}
