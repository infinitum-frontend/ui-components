// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from 'react'
import { StoryObj, StoryFn, Meta } from '@storybook/react'
import { Autocomplete } from './index'
import { IAutocompleteOption } from './types'
import { AutocompleteBaseOptions, AutocompleteLongOptions } from './fixtures'
import { Form } from 'Components/Form'
import { Input } from 'Components/Input'
import { Button } from 'Components/Button'

const meta: Meta<typeof Autocomplete> = {
  title: 'Form/Autocomplete',
  component: Autocomplete,
  args: {
    options: AutocompleteBaseOptions
  },
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
      selectedValue={selectedItem}
    />
  )
}

export const Playground = {
  render: Template
}

export const Scrollable = {
  render: Template,
  args: {
    maxHeight: 200,
    options: AutocompleteLongOptions
  }
}

export const Disabled = {
  render: Template,
  args: {
    disabled: true
  }
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

export const Required: StoryObj<typeof Autocomplete> = {
  render: (args) => {
    const [selectedItem, setSelectedItem] = useState<string | number>('')
    const [inputVal, setInputVal] = useState('')

    const handleSubmit = (): void => {
      alert('submit')
    }

    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group required>
          <Form.Label>Поле</Form.Label>
          <Autocomplete
            {...args}
            onChange={(value) => setSelectedItem(value)}
            selectedValue={selectedItem}
          />
        </Form.Group>
        <Form.Group required>
          <Form.Label>Поле</Form.Label>
          <Input value={inputVal} onChange={setInputVal} />
        </Form.Group>
        <Button type="submit">Отправить</Button>
      </Form>
    )
  }
}

export const RequiredControlledVariant: StoryObj<typeof Autocomplete> = {
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
    const handleSubmit = (): void => {
      alert('submit')
    }

    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group required>
          <Form.Label>Поле</Form.Label>
          <Autocomplete
            selectedValue={selectedItem}
            opened={open}
            onOpenChange={(value) => setOpen(value)}
          >
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
        </Form.Group>
        <Button type="submit">Отправить</Button>
      </Form>
    )
  }
}
